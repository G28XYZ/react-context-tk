import React from 'react';
import { TAllActions, TCaseAction, TDispatch } from '../types';
export type TMiddleware<S extends StoreClass<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends TAllActions = TAllActions, K extends string = undefined> = {
    readonly action: Readonly<TCaseAction<A, K extends undefined ? keyof A : K>>;
    readonly actions: Readonly<A>;
    readonly state: Readonly<S>;
    readonly dispatch: TDispatch;
};
export declare class StoreClass<S extends object, A extends TAllActions> {
    parent: typeof StoreClass.prototype;
    private _actions;
    protected _state: S;
    private _defaultContext;
    private _isInit;
    private middlewares;
    private context;
    protected init(state: S, actions: A): {
        storeInstance: StoreClass<S, A>;
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
    private setMiddleware;
    protected getState(): S;
    protected setState(state: S): void;
    createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A, `${keyof S & string}/${keyof A & string}`>) => any)[]): {
        action: (props: TMiddlewareProps<S, A, undefined>) => any;
    }[];
}
export declare const Store: <S extends object, A extends TAllActions>(state: S, actions: A) => {
    storeInstance: StoreClass<S, A>;
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
