import _ from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../store/types';

type TReducer<S extends TStore> = TAllActions<S>;

export class Slice<State extends TStore, Reducers extends TReducer<State>, Name extends string> {
	private _initState: State = undefined;
	private _name: Name = undefined;
	private _reducers: Reducers = undefined;
	private _actions = {} as TActions<State, Reducers>;

	constructor(props: TSliceProps<State, Reducers, Name>) {
		this._name = props.name;
		this._reducers = props.reducers;
		this._initState = props.initState;
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
		return this._initState;
	}
	private get reducer(): State {
		const sliceName = this.name;
		const reducers = this.reducers;
		for (const f in reducers) {
			const fn = reducers[f];
			const originalFuncName = fn.name;
			if (!originalFuncName.includes(`${sliceName}/${originalFuncName}`)) {
				const sliceFuncName = `${sliceName}/${originalFuncName}`;
				Object.defineProperty(fn, 'name', {
					value: sliceFuncName,
					writable: false,
					enumerable: false,
				});
				_.assign(this._actions, {
					[sliceFuncName]: (payload: never) => {
						fn(this.state, payload);
						return { [sliceName]: this.state };
					},
				});
				_.assign(this._actions, {
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
	return new Slice<S, R, N>(props);
}
