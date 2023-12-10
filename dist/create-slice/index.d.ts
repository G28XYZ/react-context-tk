import { TSliceProps, TActions, TAllActions, TStore } from '../types';
type TReducer<S extends TStore> = TAllActions<S>;
export declare class SliceModel<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
    private storeInstance;
    private _name;
    private _reducers;
    private _sliceActions;
    protected init(props: TSliceProps<State, Reducers, Name>): this;
    get actions(): TActions<State, Reducers>;
    get name(): Name;
    get state(): State;
    private get reducer();
    get sliceStore(): { [K in Name]: State; };
}
export declare function createSlice<S extends TStore, R extends TReducer<S>, N extends string>(props: TSliceProps<S, R, N>): SliceModel<S, R, N>;
export {};
