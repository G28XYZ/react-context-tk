import React from 'react';
import { TAllActions, TDispatch, TSliceProps } from '../types';
type TInitStore = Parameters<(typeof StoreTestClass.prototype)['createSliceTest']>[0]['initState'];
type TInitReducers = Parameters<(typeof StoreTestClass.prototype)['createSliceTest']>[0]['reducers'];
type TInitName = Parameters<(typeof StoreTestClass.prototype)['createSliceTest']>[0]['name'] & string;
type S = Record<TInitName, TInitStore>;
type A = Record<TInitName, TInitReducers>;
export declare class StoreTestClass {
    private _actions;
    protected _state: S;
    private _defaultContext;
    private _isInit;
    private context;
    init(): {
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
    createSliceTest<T extends object, R extends TAllActions<T>, N extends string>(props: TSliceProps<T, R, N>): TSliceProps<T, R, N>;
    StoreTest(): {
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
}
export declare const StoreTest: StoreTestClass;
export {};
