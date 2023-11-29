import { ISliceAction, ISliceProps, TAppActions } from '../store/types';
export declare function createSlice<State extends object, Reducers extends ISliceAction<State>, Name extends string = string>(props: ISliceProps<State, Reducers, Name>): {
    actions: TAppActions<Reducers>;
    reducer: State;
    name: Name;
    initialState: State;
    reducers: Reducers;
};
