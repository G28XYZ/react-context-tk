import { TSliceProps, TActions, TAllActions, TStore } from '../types';
type TReducer<S extends TStore> = TAllActions<S>;
export declare class Slice<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
    private storeInstance;
    private _sliceState;
    private _name;
    private _sliceReducers;
    private _sliceActions;
    constructor(props: TSliceProps<State, Reducers, Name>);
    get actions(): TActions<State, Reducers>;
    get name(): Name;
    get reducers(): Reducers;
    get state(): State;
    private get reducer();
    get sliceStore(): { [K in Name]: State; };
}
export declare function createSlice<S extends TStore, R extends TReducer<S>, N extends string>(props: TSliceProps<S, R, N>): Slice<S, R, N>;
export {};
