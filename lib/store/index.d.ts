import React from 'react';
export * from './types';
import { TCaseAction, TDispatch } from './types';
declare class StoreClass<S extends object, A extends Record<string, Function>> {
    actions: A;
    store: S;
    defaultContext: {
        state: S;
        dispatch: () => {};
    };
    context: React.Context<{
        state: S;
        dispatch: TDispatch;
    }>;
    constructor(store: S, actions: A);
    storeReducer: React.Reducer<S, TCaseAction>;
    storeProvider: React.FC<{
        children?: React.ReactNode;
    }>;
    useStore: <T>(fn?: (state: S) => T) => (T | {
        dispatch: TDispatch;
        actions: A;
    })[] | (S | {
        dispatch: TDispatch;
        actions: A;
    })[];
    get init(): {
        useStore: <T>(fn?: (state: S) => T) => (T | {
            dispatch: TDispatch;
            actions: A;
        })[] | (S | {
            dispatch: TDispatch;
            actions: A;
        })[];
        StoreProvider: React.FC<{
            children?: React.ReactNode;
        }>;
    };
}
export declare const StoreInstance: <S extends object, A extends Record<string, Function>>(store: S, actions: A) => {
    useStore: <T>(fn?: (state: S) => T) => (T | {
        dispatch: TDispatch;
        actions: A;
    })[] | (S | {
        dispatch: TDispatch;
        actions: A;
    })[];
    StoreProvider: React.FC<{
        children?: React.ReactNode;
    }>;
} & {
    storeInstance: StoreClass<S, A>;
};
