import React from 'react';
import { TActions, TAllActions, TCaseAction, TDispatch, TStore } from './types';
import _ from 'lodash';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };

export class StoreClass<S extends object, A extends Record<string, Function>> {
	private actions: A = undefined;

	private state: S = undefined;

	private defaultContext = { state: this.state, dispatch: () => ({}) };

	private isInit = false;

	private middlewares: { action: (props: { action: any; actions: A; state: S; dispatch: TDispatch }) => any }[] = [];

	private context: React.Context<{
		state: S;
		dispatch: TDispatch;
	}> = React.createContext<{
		state: S;
		dispatch: TDispatch;
	}>(this.defaultContext);

	constructor(state: S, actions: A) {
		this.actions = actions;
		this.state = state;
	}

	private storeReducer: React.Reducer<S, TCaseAction> = (state, action) => {
		const fn = this.actions[action.type];
		const newState = _.assign(state, fn(action.payload));
		return _.cloneDeep(newState);
	};

	private useReducerWithMiddleware(): [S, React.Dispatch<TCaseAction>] {
		const [state, dispatch] = React.useReducer(this.storeReducer, this.state);
		const dispatchWithMiddleware: React.Dispatch<TCaseAction> = async (action) => {
			this.middlewares.forEach((middlewareModel) => middlewareModel.action({ action, state, actions: this.actions, dispatch }));
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
		return { useStore: this.useStore.bind(this), StoreProvider: this.storeProvider };
	}

	setMiddlware(...middleware: { action: (props: { action: any; actions: A; state: S; dispatch: TDispatch }) => any }[]) {
		this.middlewares.push(...middleware);
	}
}

export const Store = <S extends TStore, A extends Record<string, Function>>(state: S, actions: A) => {
	const instance = new StoreClass<S, A>(state, actions);
	// console.log(instance);
	return _.assign({}, instance.store, { storeInstance: instance });
};

// export const Store = <S extends object, A extends Record<string, Function>>(store: S, actions: A) => {
// 	const Context = React.createContext<{
// 		state: typeof store;
// 		dispatch: TDispatch;
// 	}>({ state: store, dispatch: () => ({}) });

// 	const storeReducer: React.Reducer<typeof store, TCaseAction> = (state, action) => {
// 		const fn = actions[action.type];
// 		const newState = _.assign(state, fn(action.payload));
// 		return _.cloneDeep(newState);
// 	};

// 	// const MiddlewareModelInstance = Container.get<TMiddleware>("MiddlewareModel");
// 	// MiddlewareModelInstance.actions = actions;

// 	// const useReducerWithMiddleware = (
// 	// 	reducer: typeof storeReducer,
// 	// 	initialState: typeof store
// 	// 	// middlewares: TMiddleware[] = []
// 	// ): [typeof store, TDispatch] => {
// 	// 	const [state, dispatch] = useReducer(reducer, initialState);
// 	// 	// const dispatchWithMiddleware = (action: TCaseAction<A>) => {
// 	// 	// 	middlewares.forEach((middlewareModel) => middlewareModel.middleware(action));
// 	// 	// 	dispatch(action);
// 	// 	// };
// 	// 	return [state, dispatch];
// 	// };

// 	const StoreProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
// 		// const [state, dispatch] = useReducerWithMiddleware(storeReducer, store);
// 		const [state, dispatch] = React.useReducer(storeReducer, store);
// 		const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
// 		// MiddlewareModelInstance.dispatch === undefined && (MiddlewareModelInstance.dispatch = dispatch);
// 		// return <Context.Provider value={value}>{children}</Context.Provider>;
// 		return React.createElement(Context.Provider, { value, children });
// 	};

// 	function useStore<T>(fn: (state: S) => T): [state: T, { actions: A; dispatch: TDispatch }];
// 	function useStore(): [state: S, { actions: A; dispatch: TDispatch }];
// 	function useStore<T>(fn?: (state: S) => T) {
// 		let { state, dispatch } = React.useContext(Context);
// 		if (fn) {
// 			return [fn(state), { dispatch, actions }];
// 		}
// 		return [state, { dispatch, actions }];
// 	}

// 	return { useStore, StoreProvider };
// };
