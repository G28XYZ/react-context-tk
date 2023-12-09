import { assign, cloneDeep } from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../types';
import Container, { Inject, Service } from 'typedi';
import { StoreClass } from '../store';
import { StoreTestCls } from '../store-test';

type TReducer<S extends TStore> = TAllActions<S>;

@Service({ id: 'Slice', transient: true })
export class Slice<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
	@Inject('StoreTestCls') private storeInstance: StoreTestCls<any, any> = null;

	private _name: Name = null;
	private _reducers: Reducers = null;
	private _sliceActions: TActions<State, Reducers> = null;

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
		return this;
	}

	get actions() {
		return this._sliceActions;
	}
	get name() {
		return this._name;
	}
	get state(): State {
		return this.storeInstance['getState']()[this.name];
	}
	private get reducer(): State {
		!this._sliceActions && (this._sliceActions = {} as TActions<State, Reducers>);
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
	return Container.get<Slice<S, R, N>>('Slice')['init'](props);
}
