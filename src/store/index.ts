import React from 'react';
import { TAllActions, type TCaseAction, TDispatch, TStore } from '../types';
import { assign, bind, cloneDeep } from 'lodash';
import Container, { Service } from 'typedi';
import { NestedKeys } from '../utils';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };
type TActionString<A extends Record<keyof A, TAllActions>> = `${keyof A & string}/${NestedKeys<A> & string}`;
export type TMiddleware<S extends StoreModel<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<
	S extends object = undefined,
	A extends Record<keyof A, TAllActions> = Record<string, TAllActions>,
	K extends string = undefined
> = {
	readonly action: TCaseAction<A[keyof A], K extends undefined ? string : TActionString<A>>;
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

	init(state: S, actions: A) {
		console.log(this._actions);
		if (this._isInit === false) {
			this._isInit = true;
			this._actions = actions;
			this._state = cloneDeep(state);
			return { ...this.store, storeInstance: this as StoreModel<S, A> };
		}
	}

	private storeReducer = (state: S, action: TCaseAction) => {
		this._state = cloneDeep(state);
		this._actions[action.type.split('/')[0]][action.type](action.payload);
		return this._state;
	};

	private useReducerWithMiddleware(): [S, TDispatch] {
		const [state, dispatch] = React.useReducer(this.storeReducer, this._state);
		const dispatchWithMiddleware: TDispatch = async (action) => {
			await Promise.allSettled(
				this._middlewares
					.map((item) => item.action.call(this, { action, state, actions: this.filterAction, dispatch }))
					.concat((async () => dispatch(action)).call(this))
			);
		};
		return [state, dispatchWithMiddleware];
	}

	private storeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
		const [state, dispatch] = this.useReducerWithMiddleware();
		const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
		return React.createElement(this.context.Provider, { value, children });
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

	private setMiddleware(...middleware: { action: (props: TMiddlewareProps<S, A, TActionString<A>>) => any }[]) {
		return (this._middlewares = this._middlewares.concat(middleware));
	}

	createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A, TActionString<A>>) => any)[]) {
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
	return instance.init(state, actions);
};
