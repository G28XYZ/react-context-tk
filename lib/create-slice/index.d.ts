import { TSliceProps, TActions, TAllActions, TStore } from '../store/types';
type TReducer<S extends TStore> = TAllActions<S>;
export declare function createSlice<State extends TStore, Reducers extends TReducer<State>, Name extends string>(props: TSliceProps<State, Reducers, Name>): {
    initialState: State;
    name: Name;
    reducers: Reducers;
    actions: TActions<State, Reducers>;
    readonly reducer: State;
};
export {};
