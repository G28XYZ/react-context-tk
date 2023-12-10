import React from 'react';
import { TAllActions, type TCaseAction, TDispatch } from '../types';
import { NestedKeys } from '../utils';
type TActionString<A extends Record<keyof A, any>> = `${keyof A & string}/${NestedKeys<A> & string}`;
export type TMiddleware<S extends StoreModel<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends Record<keyof A, TAllActions> = Record<string, TAllActions>> = {
    readonly action: TCaseAction<A[keyof A], TActionString<A>>;
    readonly actions: {
        [K in keyof A]: A[K];
    };
    readonly state: Readonly<S>;
    readonly dispatch: TDispatch;
};
export declare class StoreModel<S extends object, A extends {
    [K: string]: TAllActions;
}> {
    private _actions;
    protected _state: S;
    private _defaultContext;
    private _isInit;
    private _middlewares;
    private context;
    protected init(state: S, actions: A): {
        storeInstance: StoreModel<S, A>;
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
            optionalState?: object;
        }>;
    };
    private onTry;
    private storeReducer;
    private useReducerWithMiddleware;
    private storeProvider;
    private useStore;
    get proxyState(): S;
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
            optionalState?: object;
        }>;
    };
    protected getState(): S;
    protected setState(state: S): void;
    private setMiddleware;
    createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A>) => any)[]): {
        action: (props: TMiddlewareProps<S, A>) => any;
    }[];
    protected checkSliceName(name: keyof S): boolean;
    private get filterAction();
}
export declare const Store: <S extends object, A extends Record<string, TAllActions>>(state: S, actions: A) => {
    storeInstance: StoreModel<S, A>;
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
        optionalState?: object;
    }>;
};
export {};
