# Description

This package is for using react context with functions similar to those in rudexjs/toolkit.

# Install

```bash
npm i react-context-tk
```

# Example

### store.ts

```typescript
import { Store, TSliceAction, createSlice, TMiddleware } from 'react-context-tk';

const initAppState = {
  count: 0,
  test: '',
  isLoading: false,
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
    onFetching(state, payload: boolean) {
      state.isLoading = payload;
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
  ...appSlice.sliceStore,
  ...otherSlice.sliceStore,
};

const actions = {
  [appSlice.name]: appSlice.actions,
  [otherSlice.name]: otherSlice.actions,
};

export const { useStore, StoreProvider, storeInstance } = Store(store, actions);

const actionMiddleware: TMiddleware<typeof storeInstance> = async (props) => {
  switch (props.action.type) {
    case 'app/onCount':
      props.dispatch(props.actions.app.onFetching(true));
      await fetch('https://swapi.dev/api/');
      props.dispatch(props.actions.app.onFetching(false));
  }
};

const middlewares = storeInstance.createMiddleware(actionMiddleware);

console.log(middlewares, storeInstance);
```

### app.tsx

```tsx
import React from 'react';
import { StoreProvider, useStore } from './store';

export const Counter = () => {
  const [[count, text, store], { dispatch, actions }] = useStore((state) => [state.app.count, state.test.text, state]);

  console.log('store', store);

  return (
    <div>
      <div
        style={{
          pointerEvents: store.app.isLoading ? 'none' : 'auto',
          opacity: store.app.isLoading ? 0.5 : 1,
        }}>
        <button
          style={{ marginRight: 10, width: 50 }}
          onClick={() => dispatch(actions.app.onCount(count - 1))}
          children=" - "
        />
        <button
          style={{ marginRight: 10, width: 50 }}
          onClick={() => dispatch(actions.app.onCount(count + 1))}
          children=" + "
        />
        <div>{count}</div>
      </div>
      <input
        value={text}
        onChange={(e) =>
          dispatch(
            actions.test.onChangeText({
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
