import { NestedKeys } from '../utils';

export type TStore = object;
export type TAllActions = Record<string, TSliceAction<TStore, undefined | Partial<TStore>>>;

export type TDispatch = React.Dispatch<TCaseAction>;

export type TCaseAction<A extends TAllActions = TAllActions, K extends keyof A = string> = {
	type: K;
	payload: Parameters<A[K]>[1];
};

export type TSliceAction<S extends TStore = undefined, P = undefined> = P extends object
	? (state: S, payload: P) => void
	: S extends object
	? (state: S) => void
	: () => void;

export type TSliceProps<S extends TStore, R extends TAllActions, Name> = {
	name: Name;
	initialState: S;
	reducers: R;
};

export type TStoreKey = NestedKeys<{ store: TStore }>;
export type TActionPayload = TStore[TStoreKey];

export type TActions<A extends TAllActions> = {
	[K in keyof A]: Parameters<A[K]>[1] extends undefined ? () => TCaseAction : (payload: Parameters<A[K]>[1]) => TCaseAction;
};
