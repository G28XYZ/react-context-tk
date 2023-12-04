import React from 'react';
import { TAllActions, TCaseAction, TDispatch, TStore } from '../types';
import { cloneDeep } from 'lodash';
import Container, { Service } from 'typedi';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };
export type TMiddleware<S extends StoreClass<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends TAllActions = TAllActions, K extends string = undefined> = {
	readonly action: Readonly<TCaseAction<A, K extends undefined ? keyof A : K>>;
	readonly actions: Readonly<A>;
	readonly state: Readonly<S>;
	readonly dispatch: TDispatch;
};

@Service('StoreClass')
export class StoreClass<S extends object, A extends TAllActions> {
	private actions: A = undefined;

	private state: S = undefined;

	private defaultContext = { state: this.state, dispatch: () => ({}) };

	private isInit = false;

	private middlewares: { action: (props: TMiddlewareProps<S, A>) => any }[] = [];

	private context: React.Context<{
		state: S;
		dispatch: TDispatch;
	}> = React.createContext<{
		state: S;
		dispatch: TDispatch;
	}>(this.defaultContext);

	protected init(state: S, actions: A) {
		if (this.isInit === false) {
			this.isInit = true;
			this.actions = actions;
			this.state = cloneDeep(state);
			return { ...this.store, storeInstance: this as StoreClass<S, A> };
		}
	}

	private storeReducer: React.Reducer<S, TCaseAction> = (state, action) => {
		this.state = cloneDeep(state);
		this.actions[action.type](action.payload);
		return this.state;
	};

	private useReducerWithMiddleware(): [S, TDispatch] {
		const [state, dispatch] = React.useReducer(this.storeReducer, this.state);
		const dispatchWithMiddleware: TDispatch = async (action) => {
			await Promise.allSettled(
				this.middlewares.map((item) => item.action.call(this, { action, state, actions: this.actions, dispatch }))
			);
			dispatch(action);
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
		const { state, dispatch } = React.useContext(this.context);
		if (fn) {
			return [fn(state), { dispatch, actions: this.actions }];
		}
		return [state, { dispatch, actions: this.actions }];
	}

	get store() {
		return {
			useStore: this.useStore.bind(this),
			StoreProvider: Object.defineProperty(this.storeProvider, 'name', { value: 'StoreProvider' }),
		};
	}

	private setMiddlware(...middleware: { action: (props: TMiddlewareProps<S, A, `${keyof S & string}/${keyof A & string}`>) => any }[]) {
		return (this.middlewares = this.middlewares.concat(middleware));
	}

	protected getState() {
		return this.state;
	}

	protected setState(state: S) {
		this.state = cloneDeep({ ...this.state, ...state });
	}

	createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A, `${keyof S & string}/${keyof A & string}`>) => any)[]) {
		return this.setMiddlware(...fnArr.map((fn) => ({ action: fn })));
	}
}

export const Store = <S extends TStore, A extends TAllActions>(state: S, actions: A) => {
	return Container.get<StoreClass<S, A>>('StoreClass')['init'](state, actions);
};
