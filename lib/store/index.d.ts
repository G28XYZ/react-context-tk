import React from 'react';
import { TDispatch } from './types';
export declare const Store: () => {
    useStore: () => {
        actions: any;
        state: any;
        dispatch: TDispatch;
    };
    StoreProvider: React.FC<{
        children?: React.ReactNode;
    }>;
};
