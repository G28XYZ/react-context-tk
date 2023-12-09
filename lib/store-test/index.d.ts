import React from 'react';
import { TAllActions, type TCaseAction, TDispatch } from '../types';
export type TMiddlewareTest<S extends StoreTestCls<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends Record<string, TAllActions> = Record<string, TAllActions>, K extends string = undefined> = {
    readonly action: Readonly<TCaseAction<A[string], K extends undefined ? keyof A[string] : K>>;
    readonly actions: Readonly<A>;
    readonly state: Readonly<S>;
    readonly dispatch: TDispatch;
};
export declare class StoreTestCls<S extends object, A extends {
    [K: string]: TAllActions;
}> {
    private _actions;
    protected _state: S;
    private _defaultContext;
    private _isInit;
    private _middlewares;
    private context;
    init(state: S, actions: A): {
        storeInstance: StoreTestCls<any, any>;
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
    protected getState(): S;
    protected setState(state: S): void;
    private setMiddleware;
    createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A, `${keyof S & string}/${keyof A[keyof S & string] & string}`>) => any)[]): {
        action: (props: TMiddlewareProps<S, A, undefined>) => any;
    }[];
    protected checkSliceName(name: keyof S): boolean;
}
export declare const StoreTest: <S extends object, A extends Record<string, TAllActions>>(state: S, actions: A) => {
    storeInstance: StoreTestCls<any, any>;
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
export {};
