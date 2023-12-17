export * from './types';

const ESArray = Array;
// const ESString = String;
// const ESDate = Date;

const IsArray = 'isArray' in ESArray ? ESArray.isArray : (value: any) => toString.call(value) === '[object Array]';

const IsFunction =
  typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function'
    ? (value: any) => !!value && toString.call(value) === '[object Function]'
    : (value: any) => !!value && typeof value === 'function';

const IsEmpty = (value: any, allowEmptyString?: boolean) => {
  return value == null || (!allowEmptyString ? value === '' : false) || (IsArray(value) && value.length === 0);
};

export const Utils = {
  array: {
    IsArray,
  },
  object: {
    IsEmpty,
    IsFunction,
  },
};
