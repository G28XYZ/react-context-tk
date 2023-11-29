export * from './types';

export const ESArray = Array;
export const ESString = String;
export const ESDate = Date;

export const IsArray = 'isArray' in ESArray ? ESArray.isArray : (value: any) => toString.call(value) === '[object Array]';

export const IsFunction =
	typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function'
		? (value: any) => !!value && toString.call(value) === '[object Function]'
		: (value: any) => !!value && typeof value === 'function';

export const IsEmpty = (value: any, allowEmptyString?: boolean) => {
	return value == null || (!allowEmptyString ? value === '' : false) || (IsArray(value) && value.length === 0);
};
