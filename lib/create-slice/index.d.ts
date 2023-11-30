import { TSliceProps, TActions } from '../store/types';
export declare function createSlice<State extends object, Reducers extends Record<string, any>, Name extends string>(props: TSliceProps<State, Reducers, Name>): {
    initialState: State;
    name: Name;
    reducers: Reducers;
    actions: TActions<Reducers>;
    readonly reducer: State;
};
