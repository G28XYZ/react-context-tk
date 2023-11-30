import { ISliceAction, ISliceProps, TAppActions } from '../store/types';
export declare function createSlice<State extends object, Reducers extends ISliceAction<State>, Name extends string = string>(props: ISliceProps<State, Reducers, Name>): {
    initialState: State;
    name: Name;
    reducers: Reducers;
    actions: TAppActions<Reducers>;
    readonly reducer: State;
};
