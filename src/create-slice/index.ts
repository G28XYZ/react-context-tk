import { assign, bind, cloneDeep, isEqual } from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../types';
import { Inject } from 'typedi';
import { StoreClass } from '../store';

type TReducer<S extends TStore> = TAllActions<S>;

export class Slice<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
	@Inject('StoreClass') private storeInstance: StoreClass<any, any>;
	private _state: State = undefined;
	private _name: Name = undefined;
	private _reducers: Reducers = undefined;
	private _actions = {} as TActions<State, Reducers>;

	constructor(props: TSliceProps<State, Reducers, Name>) {
		if (!props.name) {
			throw Error('The name for the slice must be set');
		}
		this._name = props.name;
		this._reducers = props.reducers;
		this._state = cloneDeep(props.initState);
	}
	get actions() {
		return this._actions;
	}
	get name() {
		return this._name;
	}
	get reducers() {
		return this._reducers;
	}
	get state(): State {
		return this._state;
	}
	private set state(s: State) {
		this._state = s;
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
				assign(this._actions, {
					[sliceFuncName]: (payload: never, store: Record<Name, State>) => {
						fn(store[this.name], payload);
						this.state = store[this.name];
						return store;
					},
				});
				assign(this._actions, {
					[originalFuncName]: (payload: Partial<TActionPayload>) => {
						return { type: sliceFuncName, payload };
					},
				});
			}
		}
		return this.state;
	}

	get store() {
		return { [this.name]: this.reducer } as { [K in Name]: State };
	}
}

export function createSlice<S extends TStore, R extends TReducer<S>, N extends string>(props: TSliceProps<S, R, N>) {
	return new Slice<S, R, N>({ ...props, initState: cloneDeep(props.initState) });
}
