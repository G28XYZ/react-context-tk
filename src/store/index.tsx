import React from 'react';
import { TCaseAction, TDispatch } from './types';
import _ from 'lodash';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };

export const Store = () => {
	const actions = {} as any;
	const store = {} as any;

	const AppContext = React.createContext<{
		state: typeof store;
		dispatch: TDispatch;
	}>({ state: store, dispatch: () => ({}) });

	const storeReducer: React.Reducer<typeof store, TCaseAction> = (state, action) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const newState = _.assign(state, (actions[action.type] as any)(action.payload!));
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
		return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
	};

	function useStore() {
		return { ...React.useContext(AppContext), actions };
	}

	return { useStore, StoreProvider };
};

// const actions = {} as any;
// const store = {} as any;

// const AppContext = createContext<{
// 	state: typeof store;
// 	dispatch: TDispatch;
// }>({ state: store, dispatch: () => ({}) });

// const storeReducer: Reducer<typeof store, TCaseAction> = (state, action) => {
// 	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 	const newState = _.assign(state, (actions[action.type] as any)(action.payload!));
// 	return _.cloneDeep(newState);
// };

// // const MiddlewareModelInstance = Container.get<TMiddleware>("MiddlewareModel");
// // MiddlewareModelInstance.actions = actions;

// // const useReducerWithMiddleware = (
// // 	reducer: typeof storeReducer,
// // 	initialState: typeof store
// // 	// middlewares: TMiddleware[] = []
// // ): [typeof store, TDispatch] => {
// // 	const [state, dispatch] = useReducer(reducer, initialState);
// // 	// const dispatchWithMiddleware = (action: TCaseAction<A>) => {
// // 	// 	middlewares.forEach((middlewareModel) => middlewareModel.middleware(action));
// // 	// 	dispatch(action);
// // 	// };
// // 	return [state, dispatch];
// // };

// export const StoreProvider: FC<{ children?: ReactNode, React: any }> = ({ children }) => {
// 	// const [state, dispatch] = useReducerWithMiddleware(storeReducer, store);
// 	const [state, dispatch] = React.useReducer(storeReducer, store);
// 	const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
// 	// MiddlewareModelInstance.dispatch === undefined && (MiddlewareModelInstance.dispatch = dispatch);
// 	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export function useStore() {
// 	return { ...useContext(AppContext), actions };
// }
