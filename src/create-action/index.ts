import { TSliceAction, TStore } from '../types';

export const createAction = <T extends TStore, K extends keyof T>(state?: T, fields?: K) => {
	// const fn: TSliceAction<T, Pick<T, K>> = (state, payload) => {};
	// return fn;
};
