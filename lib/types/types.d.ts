/// <reference types="react" />
import { NestedKeys } from '../utils';
export type TStore = object;
export type TAllActions<S extends TStore = undefined, P = undefined> = Record<string, TSliceAction<S, P>>;
export type TDispatch = React.Dispatch<TCaseAction>;
export type TCaseAction<A extends TAllActions = TAllActions, K extends keyof A = keyof A> = {
    type: K;
    payload: Parameters<A[K]>[1];
};
export type TPayload<S, P = never> = P;
export type TSliceAction<S extends TStore = undefined, P = undefined> = (state?: S, payload?: P) => void;
export type TSliceProps<S extends TStore, R extends TAllActions<S>, Name> = {
    name: Name;
    initState: S;
    reducers: R;
};
export type TStoreKey = NestedKeys<{
    store: TStore;
}>;
export type TActionPayload = TStore[TStoreKey];
export type TActions<S extends TStore, A extends TAllActions<S>> = {
    [K in keyof A]: Parameters<A[K]>[1] extends undefined ? () => TCaseAction<A> : (payload: Parameters<A[K]>[1]) => TCaseAction<A>;
};
