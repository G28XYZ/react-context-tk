import React from 'react';
export * from './types';
import { TDispatch } from './types';
export declare const Store: <S extends Record<string, any>, A extends Record<string, Function>>(store: S, actions: A) => {
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
