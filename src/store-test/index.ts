import React from 'react';
import { TAllActions, type TCaseAction, TDispatch, TStore } from '../types';
import { assign, bind, cloneDeep } from 'lodash';
import Container, { Service } from 'typedi';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };
export type TMiddlewareTest<S extends StoreTestCls<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<
	S extends object = undefined,
	A extends Record<string, TAllActions> = Record<string, TAllActions>,
	K extends string = undefined
> = {
	readonly action: Readonly<TCaseAction<A[string], K extends undefined ? keyof A[string] : K>>;
	readonly actions: Readonly<A>;
	readonly state: Readonly<S>;
	readonly dispatch: TDispatch;
};

@Service('StoreTestCls')
export class StoreTestCls<S extends object, A extends { [K: string]: TAllActions }> {
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
		if (this._isInit === false) {
			this._isInit = true;
			this._actions = actions;
			this._state = cloneDeep(state);
			return { ...this.store, storeInstance: this as typeof StoreTestCls.prototype };
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
					.map((item) => item.action.call(this, { action, state, actions: this._actions, dispatch }))
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
			return [fn(this._state), { dispatch, actions: this._actions }];
		}
		return [this._state, { dispatch, actions: this._actions }];
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

	private setMiddleware(
		...middleware: { action: (props: TMiddlewareProps<S, A, `${keyof S & string}/${keyof A[keyof S & string] & string}`>) => any }[]
	) {
		return (this._middlewares = this._middlewares.concat(middleware));
	}

	createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A, `${keyof S & string}/${keyof A[keyof S & string] & string}`>) => any)[]) {
		return this.setMiddleware(...fnArr.map((fn) => ({ action: fn })));
	}

	protected checkSliceName(name: keyof S) {
		if (this._state) {
			return name in this._state;
		}
	}
}

export const StoreTest = <S extends TStore, A extends Record<string, TAllActions>>(state: S, actions: A) => {
	const instance = Container.get<StoreTestCls<S, A>>('StoreTestCls');
	return instance.init(state, actions);
};
