import _ from 'lodash';
import { TSliceProps, TActionPayload, TActions } from '../store/types';

export function createSlice<State extends object, Reducers extends Record<string, any>, Name extends string>(
	props: TSliceProps<State, Reducers, Name>
) {
	return {
		initialState: props.initialState,
		name: props.name,
		reducers: props.reducers,
		actions: { ...props.reducers } as TActions<Reducers>,
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
