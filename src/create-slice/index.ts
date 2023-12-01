import _ from 'lodash';
import { TSliceProps, TActionPayload, TActions, TAllActions, TStore } from '../store/types';

type TReducer<S extends TStore> = TAllActions<S>;

export function createSlice<State extends TStore, Reducers extends TReducer<State>, Name extends string>(
	props: TSliceProps<State, Reducers, Name>
) {
	return {
		initialState: props.initialState,
		name: props.name,
		reducers: props.reducers,
		actions: {} as TActions<State, Reducers>,
		get reducer(): State {
			const sliceName = this.name;
			const reducers = this.reducers;
			for (const f in reducers) {
				const func = reducers[f];
				const originalFuncName = func.name;
				if (!originalFuncName.includes(`${sliceName}/${originalFuncName}`)) {
					const sliceFuncName = `${sliceName}/${originalFuncName}`;
					Object.defineProperty(func, 'name', {
						value: sliceFuncName,
						writable: false,
						enumerable: false,
					});
					_.assign(this.actions, {
						[sliceFuncName]: (payload: State) => {
							func(this.initialState, payload);
							return { [sliceName]: this.initialState };
						},
					});
					_.assign(this.actions, {
						[originalFuncName]: (payload: Partial<TActionPayload>) => {
							return { type: sliceFuncName, payload };
						},
					});
				}
			}
			return this.initialState;
		},
	};
}
