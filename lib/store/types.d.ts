/// <reference types="react" />
import { NestedKeys } from '../utils';
export type TStore = object;
export type TAllActions = any;
export type TDispatch = React.Dispatch<TCaseAction>;
export type TCaseAction<A extends Record<string, any> = TAllActions, K extends keyof A = string> = {
    type: K;
    payload: Parameters<A[K]>[1];
};
export type TSliceAction<State = undefined, Payload = undefined> = Payload extends object ? (state: State, payload: Payload) => void : State extends object ? (state: State) => void : () => void;
export interface ISliceAction<State> {
    [key: string]: TSliceAction<State, State>;
}
export interface ISliceProps<State, Reducers, Name> {
    name: Name;
    initialState: State;
    reducers: Reducers;
}
export type TStoreKey = NestedKeys<{
    store: TStore;
}>;
export type TActionPayload = TStore[TStoreKey];
export type TAppActions<A extends Record<string, any>> = {
    [K in keyof A]: Parameters<A[K]>[1] extends undefined ? () => TCaseAction : (payload: Parameters<A[K]>[1]) => TCaseAction;
};
