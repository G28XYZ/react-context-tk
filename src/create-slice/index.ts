import { ISliceAction, ISliceProps, TActionPayload, TAppActions } from '../store/types';

export function createSlice<State extends object, Reducers extends ISliceAction<State>, Name extends string = string>(
	props: ISliceProps<State, Reducers, Name>
) {
	return {
		...props,
		actions: {} as TAppActions<Reducers>,
		get reducer(): State {
			const sliceName = this.name;
			const reducers = this.reducers;
			for (const f in reducers) {
				const func = reducers[f];
				const originalFuncName = func.name;
				if (originalFuncName !== `${sliceName}/${originalFuncName}`) {
					const sliceFuncName = `${sliceName}/${originalFuncName}`;
					Object.defineProperty(func, 'name', {
						value: sliceFuncName,
						writable: false,
						enumerable: false,
					});
					Object.assign(this.actions, {
						[sliceFuncName]: (payload: State) => {
							func(this.initialState, payload);
							return { [sliceName]: this.initialState };
						},
					});
					Object.assign(this.actions, {
						[originalFuncName]: (payload: Partial<TActionPayload>) => ({ type: sliceFuncName, payload }),
					});
				}
			}
			return this.initialState;
		},
	};
}
