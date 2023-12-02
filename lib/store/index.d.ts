import React from 'react';
import { TDispatch } from './types';
export declare class StoreClass<S extends object, A extends Record<string, Function>> {
    private actions;
    private state;
    private defaultContext;
    private isInit;
    private middlewares;
    private context;
    constructor(state: S, actions: A);
    private storeReducer;
    private useReducerWithMiddleware;
    private storeProvider;
    private useStore;
    get store(): {
        useStore: {
            <T>(fn: (state: S) => T): [state: T, {
                actions: A;
                dispatch: TDispatch;
            }];
            (): [state: S, {
                actions: A;
                dispatch: TDispatch;
            }];
        };
        StoreProvider: React.FC<{
            children?: React.ReactNode;
        }>;
    };
    setMiddlware(...middleware: {
        action: (props: {
            action: any;
            actions: A;
            state: S;
            dispatch: TDispatch;
        }) => any;
    }[]): void;
}
export declare const Store: <S extends object, A extends Record<string, Function>>(state: S, actions: A) => {
    useStore: {
        <T>(fn: (state: S) => T): [state: T, {
            actions: A;
            dispatch: TDispatch;
        }];
        (): [state: S, {
            actions: A;
            dispatch: TDispatch;
        }];
    };
    StoreProvider: React.FC<{
        children?: React.ReactNode;
    }>;
} & {
    storeInstance: StoreClass<S, A>;
};
