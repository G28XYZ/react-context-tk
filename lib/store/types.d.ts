/// <reference types="react" />
import { NestedKeys } from '../utils';
export type TStore = object;
export type TAllActions = any;
export type TDispatch = React.Dispatch<TCaseAction>;
export type TCaseAction<A extends object = TAllActions, K extends keyof A = keyof A> = {
    type: K;
    payload: any;
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
export type TAppActions<A extends object> = {
    [K in keyof A]: any;
};
