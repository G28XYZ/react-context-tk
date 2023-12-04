import { assign, cloneDeep } from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../types';
import Container, { Inject, Service } from 'typedi';
import { StoreClass } from '../store';

type TReducer<S extends TStore> = TAllActions<S>;

@Service({ id: 'Slice', transient: true })
export class Slice<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
	@Inject('StoreClass') private storeInstance: StoreClass<any, any> = undefined;
	private _name: Name = undefined;
	private _reducers: Reducers = undefined;
	private _actions = {} as TActions<State, Reducers>;

	protected init(props: TSliceProps<State, Reducers, Name>) {
		if (!props.name) {
			throw Error('The name for the slice must be set');
		}
		this._name = props.name;
		this._reducers = props.reducers;
		this.storeInstance['setState']({ [this._name]: cloneDeep(props.initState) });
		return this;
	}
	get actions() {
		return this._actions;
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
				assign(this._actions, {
					[sliceFuncName]: (payload: never) => {
						fn(this.state, payload);
						return { [this.name]: this.state };
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
	return Container.get<Slice<S, R, N>>('Slice')['init'](props);
}
