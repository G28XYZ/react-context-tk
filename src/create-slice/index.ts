import { assign, bind, cloneDeep, isEqual } from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../types';
import Container, { Inject } from 'typedi';
import { StoreClass } from '../store';

type TReducer<S extends TStore> = TAllActions<S>;

export class Slice<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
	private storeInstance: StoreClass<any, any> = undefined;
	private _sliceState: State = undefined;
	private _name: Name = undefined;
	private _sliceReducers: Reducers = undefined;
	private _sliceActions = {} as TActions<State, Reducers>;

	constructor(props: TSliceProps<State, Reducers, Name>) {
		if (!props.name) {
			throw Error('The name for the slice must be set');
		}
		this.storeInstance = Container.get<StoreClass<State, any>>('StoreClass');
		this._name = props.name;
		this._sliceReducers = props.reducers;
		this._sliceState = cloneDeep(props.initState);
	}

	get actions() {
		return this._sliceActions;
	}
	get name() {
		return this._name;
	}
	get reducers() {
		return this._sliceReducers;
	}
	get state(): State {
		return this?.storeInstance?.['_state']?.[this.name] || this._sliceState;
	}
	private get reducer(): State {
		const sliceName = this.name;
		const reducers = this.reducers;
		for (const f in reducers) {
			const originalFuncName = reducers[f].name;
			if (!originalFuncName.includes(`${sliceName}/${originalFuncName}`)) {
				const sliceFuncName = `${sliceName}/${originalFuncName}`;
				// Object.defineProperty(reducers[f], 'name', {
				// 	value: sliceFuncName,
				// 	writable: false,
				// 	enumerable: false,
				// });
				const fn = reducers[f].bind(this) as any;
				assign(this._sliceActions, {
					[sliceFuncName]: (payload: never) => {
						fn(this.state, payload);
						return { [this.name]: this.state };
					},
				});
				assign(this._sliceActions, {
					[originalFuncName]: (payload: Partial<TActionPayload>) => {
						return { type: sliceFuncName, payload };
					},
				});
			}
		}
		return this.state;
	}

	get sliceStore() {
		return { [this.name]: this.reducer } as { [K in Name]: State };
	}
}

export function createSlice<S extends TStore, R extends TReducer<S>, N extends string>(props: TSliceProps<S, R, N>) {
	return new Slice<S, R, N>({ ...props, initState: cloneDeep(props.initState) });
}
