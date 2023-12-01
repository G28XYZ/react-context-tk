import React from 'react';
export * from './types';
import { TCaseAction, TDispatch, TSliceAction } from './types';
import _ from 'lodash';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };

class StoreClass<S extends object, A extends Record<string, Function>> {
	actions: A = undefined;

	store: S = undefined;

	defaultContext = { state: this.store, dispatch: () => ({}) };

	context = React.createContext<{
		state: S;
		dispatch: TDispatch;
	}>(this.defaultContext);

	constructor(store: S, actions: A) {
		this.actions = actions;
		this.store = store;
		this.context = React.createContext<{
			state: S;
			dispatch: TDispatch;
		}>({ state: this.store, dispatch: () => ({}) });
	}

	storeReducer: React.Reducer<S, TCaseAction> = (state, action) => {
		const fn = this.actions[action.type];
		const newState = _.assign(state, fn(action.payload));
		return _.cloneDeep(newState);
	};

	storeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
		const [state, dispatch] = React.useReducer(this.storeReducer, this.store);
		const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
		return React.createElement(this.context.Provider, { value, children });
	};

	// useStore<T>(fn: (state: S) => T): [state: T, { actions: A; dispatch: TDispatch }];
	// useStore(): [state: S, { actions: A; dispatch: TDispatch }];
	useStore = <T>(fn?: (state: S) => T) => {
		let { state, dispatch } = React.useContext(this.context);
		if (fn) {
			return [fn(state), { dispatch, actions: this.actions }];
		}
		return [state, { dispatch, actions: this.actions }];
	};

	get init() {
		return { useStore: this.useStore, StoreProvider: this.storeProvider };
	}
}

export const StoreInstance = <S extends object, A extends Record<string, Function>>(store: S, actions: A) => {
	const instance = new StoreClass(store, actions);
	console.log(instance);
	return _.assign({}, instance.init, { storeInstance: instance });
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
