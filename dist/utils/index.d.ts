export * from './types';
export declare const Utils: {
    array: {
        IsArray: (value: any) => boolean;
    };
    object: {
        IsEmpty: (value: any, allowEmptyString?: boolean) => boolean;
        IsFunction: (value: any) => boolean;
    };
};
