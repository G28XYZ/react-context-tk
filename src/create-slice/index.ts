import { assign, cloneDeep } from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../types';
import Container, { Inject, Service } from 'typedi';
import { StoreModel } from '../store';

type TReducer<S extends TStore> = TAllActions<S>;

@Service({ id: 'SliceModel', transient: true })
export class SliceModel<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
	@Inject('StoreModel') private storeInstance: StoreModel<any, any> = null;

	private _name: Name = null;
	private _reducers: Reducers = null;
	private _sliceActions = {} as TActions<State, Reducers>;

	protected init(props: TSliceProps<State, Reducers, Name>) {
		if (!props.name) {
			throw Error('The slice name cannot be empty and must be set.');
		}
		if (this.storeInstance['checkSliceName'](props.name as string)) {
			throw Error(`The name '${props.name}' for the slice must be uniq, change another name slice.`);
		}
		this._name = props.name;
		this._reducers = props.reducers;
		this.storeInstance['setState']({ [this._name]: cloneDeep(props.initState) });
		// this.storeInstance['_actions'] = { ...this.storeInstance['_actions'], [this._name]: this._sliceActions };
		return this;
	}

	get actions() {
		return this._sliceActions;
		return Object.keys(this._sliceActions).reduce(
			(obj, key) => (key.includes(`${this._name}/`) ? obj : { ...obj, [key]: this._sliceActions[key] }),
			{} as TActions<State, Reducers>
		);
	}
	get name() {
		return this._name;
	}
	get state(): State {
		return this.storeInstance['getState']()[this.name];
	}
	private get reducer(): State {
		for (const f in this._reducers) {
			const originalFuncName = this._reducers[f].name;
			if (!originalFuncName.includes(`${this.name}/${originalFuncName}`)) {
				const sliceFuncName = `${this.name}/${originalFuncName}`;
				const fn = this._reducers[f].bind(this) as any;
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
	return Container.get<SliceModel<S, R, N>>('SliceModel')['init'](props);
}
