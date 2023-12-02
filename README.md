# Install

```bash
npm i react-context-tk
```

# Example

### store.ts

```typescript
import { Store, TSliceAction, createSlice } from 'react-context-tk';

const initAppState = {
	count: 0,
};

const initOtherState = {
	text: 'test',
	test: {
		test1: {
			test2: {
				text: 'test2',
				test3: {
					result: {
						text: 'result',
					},
				},
			},
		},
	},
};

type TAppState = typeof initAppState;
type TOtherState = typeof initOtherState;
// ---> v1 action example
const onCount: TSliceAction<TAppState, number> = (state, payload) => {
	state.count = payload;
};
// ---> v2 action example
const onChangeText = (state: TOtherState, payload: Pick<TOtherState, 'text'>) => {
	state.text = payload.text;
};

const appSlice = createSlice({
	name: 'app',
	initState: initAppState,
	reducers: {
		onCount,
		// ---> v3 action example
		test(state, payload: number) {
			console.log(state, payload);
		},
	},
});

const otherSlice = createSlice({
	name: 'test',
	initState: initOtherState,
	reducers: {
		onChangeText,
	},
});

const store = {
	...appSlice.store,
	...otherSlice.store,
};

const actions = { ...appSlice.actions, ...otherSlice.actions };

export const { useStore, StoreProvider } = Store(store, actions);
```

### app.tsx

```typescript
import React from 'react';
import { StoreProvider, useStore } from './store';

export const Counter = () => {
	const [[count, text, store], { dispatch, actions }] = useStore((state) => [state.app.count, state.test.text, state]);

	const [fullStore] = useStore();

	return (
		<div>
			<button
				style={{ marginRight: 10, width: 50 }}
				onClick={() => dispatch(actions.onCount(count - 1))}
				children=" - "
			/>
			<button
				style={{ marginRight: 10, width: 50 }}
				onClick={() => dispatch(actions.onCount(count + 1))}
				children=" + "
			/>
			<div>{count}</div>
			<input
				value={text}
				onChange={(e) =>
					dispatch(
						actions.onChangeText({
							text: e.target.value,
						})
					)
				}
			/>
		</div>
	);
};

export const App = () => {
	return (
		<StoreProvider>
			<Counter />
		</StoreProvider>
	);
};
```
