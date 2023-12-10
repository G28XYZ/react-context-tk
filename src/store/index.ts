import React from 'react';
import { TAllActions, type TCaseAction, TDispatch, TStore } from '../types';
import { cloneDeep } from 'lodash';
import Container, { Service } from 'typedi';
import { NestedKeys } from '../utils';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };
type TActionString<A extends Record<keyof A, any>> = `${keyof A & string}/${NestedKeys<A> & string}`;
export type TMiddleware<S extends StoreModel<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends Record<keyof A, TAllActions> = Record<string, TAllActions>> = {
	readonly action: TCaseAction<A[keyof A], TActionString<A>>;
	readonly actions: { [K in keyof A]: A[K] };
	readonly state: Readonly<S>;
	readonly dispatch: TDispatch;
};

@Service('StoreModel')
export class StoreModel<S extends object, A extends { [K: string]: TAllActions }> {
	private _actions: A = undefined;

	protected _state: S = undefined;

	private _defaultContext = { state: this._state, dispatch: () => ({}) };

	private _isInit = false;

	private _middlewares: { action: (props: TMiddlewareProps<S, A>) => any }[] = [];

	private context: React.Context<{
		state: S;
		dispatch: TDispatch;
	}> = React.createContext<{
		state: S;
		dispatch: TDispatch;
	}>(this._defaultContext);

	protected init(state: S, actions: A) {
		if (this._isInit === false) {
			this._isInit = true;
			this._actions = actions;
			this._state = cloneDeep(state);
			return { ...this.store, storeInstance: this as StoreModel<S, A> };
		}
	}

	private onTry(fn: () => any) {
		try {
			fn();
		} catch (e) {
			console.log(e);
		}
	}

	private storeReducer = (state: S, action: TCaseAction) => {
		this._state = cloneDeep(state);
		this.onTry(() => this._actions[action.type.split('/')[0]][action.type](action.payload));
		return this._state;
	};

	private useReducerWithMiddleware(): [S, TDispatch] {
		const [_, dispatch] = React.useReducer(this.storeReducer, this._state);
		const dispatchWithMiddleware: TDispatch = async (action: any) => {
			await Promise.allSettled(
				this._middlewares
					.map((item) => item.action.call(this, { action, state: this.proxyState, actions: this.filterAction, dispatch }))
					.concat((async () => dispatch(action)).call(this))
			);
		};
		return [this._state, dispatchWithMiddleware];
	}

	private storeProvider: React.FC<{ children?: React.ReactNode; optionalState?: object }> = ({ children }) => {
		const [state, dispatch] = this.useReducerWithMiddleware();
		const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
		return React.createElement(this.context.Provider, { value: Object.seal(value), children });
	};

	private useStore<T>(fn: (state: S) => T): [state: T, { actions: A; dispatch: TDispatch }];
	private useStore(): [state: S, { actions: A; dispatch: TDispatch }];
	private useStore<T>(fn?: (state: S) => T) {
		const { dispatch } = React.useContext(this.context);
		if (fn) {
			return [fn(this._state), { dispatch, actions: this.filterAction }];
		}
		return [this._state, { dispatch, actions: this.filterAction }];
	}

	get proxyState() {
		return new Proxy(Object.seal(this._state), {});
	}

	get store() {
		return {
			useStore: this.useStore.bind(this),
			StoreProvider: Object.defineProperty(this.storeProvider, 'name', { value: 'StoreProvider' }),
		};
	}

	protected getState() {
		return this._state;
	}

	protected setState(state: S) {
		this._state = cloneDeep({ ...this._state, ...state });
	}

	private setMiddleware(...middleware: { action: (props: TMiddlewareProps<S, A>) => any }[]) {
		return (this._middlewares = this._middlewares.concat(middleware));
	}

	createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A>) => any)[]) {
		return this.setMiddleware(...fnArr.map((fn) => ({ action: fn })));
	}

	protected checkSliceName(name: keyof S) {
		if (this._state) {
			return name in this._state;
		}
	}

	private get filterAction() {
		const clone = cloneDeep<A>(this._actions);
		for (const name in clone) {
			for (const action in clone[name]) {
				if (action.includes(`${name}/`)) {
					clone[name][action] = undefined;
					delete clone[name][action];
				}
			}
		}
		return clone;
	}
}

export const Store = <S extends TStore, A extends Record<string, TAllActions>>(state: S, actions: A) => {
	const instance = Container.get<StoreModel<S, A>>('StoreModel');
	return instance['init'](state, actions);
};
