import React from 'react';
import { TAllActions, type TCaseAction, TDispatch } from '../types';
import { NestedKeys } from '../utils';
type TActionString<A extends Record<keyof A, TAllActions>> = `${keyof A & string}/${NestedKeys<A> & string}`;
export type TMiddlewareTest<S extends StoreTestCls<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends Record<keyof A, TAllActions> = Record<string, TAllActions>, K extends string = undefined> = {
    readonly action: TCaseAction<A[keyof A], K extends undefined ? string : TActionString<A>>;
    readonly actions: {
        [K in keyof A]: A[K];
    };
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
        storeInstance: StoreTestCls<S, A>;
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
    createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A, TActionString<A>>) => any)[]): {
        action: (props: TMiddlewareProps<S, A, undefined>) => any;
    }[];
    protected checkSliceName(name: keyof S): boolean;
    private get filterAction();
}
export declare const StoreTest: <S extends object, A extends Record<string, TAllActions>>(state: S, actions: A) => {
    storeInstance: StoreTestCls<S, A>;
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
