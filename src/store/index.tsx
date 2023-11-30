import React from 'react';
export * from './types';
import { TCaseAction, TDispatch } from './types';
import _ from 'lodash';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };

export const Store = <S extends Record<string, any>, A extends Record<string, Function>>(store: S, actions: A) => {
	const Context = React.createContext<{
		state: typeof store;
		dispatch: TDispatch;
	}>({ state: store, dispatch: () => ({}) });

	const storeReducer: React.Reducer<typeof store, TCaseAction> = (state, action) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		console.log(action);
		const fn = actions[action.type];
		const newState = _.assign(state, fn(action.payload!));
		return _.cloneDeep(newState);
	};

	// const MiddlewareModelInstance = Container.get<TMiddleware>("MiddlewareModel");
	// MiddlewareModelInstance.actions = actions;

	// const useReducerWithMiddleware = (
	// 	reducer: typeof storeReducer,
	// 	initialState: typeof store
	// 	// middlewares: TMiddleware[] = []
	// ): [typeof store, TDispatch] => {
	// 	const [state, dispatch] = useReducer(reducer, initialState);
	// 	// const dispatchWithMiddleware = (action: TCaseAction<A>) => {
	// 	// 	middlewares.forEach((middlewareModel) => middlewareModel.middleware(action));
	// 	// 	dispatch(action);
	// 	// };
	// 	return [state, dispatch];
	// };

	const StoreProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
		// const [state, dispatch] = useReducerWithMiddleware(storeReducer, store);
		const [state, dispatch] = React.useReducer(storeReducer, store);
		const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
		// MiddlewareModelInstance.dispatch === undefined && (MiddlewareModelInstance.dispatch = dispatch);
		return <Context.Provider value={value}>{children}</Context.Provider>;
	};

	function useStore<T>(fn: (state: S) => T): [state: T, { actions: A; dispatch: TDispatch }];
	function useStore(): [state: S, { actions: A; dispatch: TDispatch }];
	function useStore<T>(fn?: (state: S) => T) {
		let { state, dispatch } = React.useContext(Context);
		if (fn) {
			return [fn(state), { dispatch, actions }];
		}
		return [state, { dispatch, actions }];
	}

	return { useStore, StoreProvider };
};
