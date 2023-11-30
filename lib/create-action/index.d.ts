import { TSliceAction } from '../store';
export declare const createAction: <T extends object, K extends keyof T>(state?: T, fields?: K) => TSliceAction<T, Pick<T, K>>;
