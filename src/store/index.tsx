import React from 'react';
import { TAllActions, type TCaseAction, TDispatch, TStore } from '../types';
import { cloneDeep } from 'lodash';
import Container, { Service } from 'typedi';
import { NestedKeys } from '../utils';

// const logger = (action: IAction) => {
// 	console.log("logger:", action);
// };
type TActionString<A extends Record<keyof A, any>> = `${keyof A & string}/${NestedKeys<A> & string}`;
export type TMiddleware<S extends StoreModel<any, any>> = Parameters<S['createMiddleware']>[0];
type TMiddlewareProps<S extends object = undefined, A extends Record<keyof A, TAllActions> = Record<string, TAllActions>> = {
  readonly action?: TCaseAction<A[keyof A], TActionString<A>>;
  readonly actions?: { [K in keyof A]: A[K] };
  readonly state?: Readonly<S>;
  readonly dispatch?: TDispatch;
};

@Service('StoreModel')
export class StoreModel<S extends object, A extends { [K: string]: TAllActions }> {
  private _actions: A = undefined;

  private _state: S = undefined;

  private _defaultContext = { state: this._state, dispatch: () => ({}) };

  private _isInit = false;

  protected middlewares: { action?: (props: TMiddlewareProps<S, A>) => any }[] = [];

  private context: React.Context<{
    state: S;
    dispatch: TDispatch<A[keyof A], TActionString<A>>;
  }> = React.createContext<{
    state: S;
    dispatch: TDispatch<A[keyof A], TActionString<A>>;
  }>(this._defaultContext);

  protected init(state: S, actions: A) {
    if (this._isInit === false) {
      this._isInit = true;
      this._actions = actions;
      this._state = cloneDeep(state);
      return {
        context: this.context,
        actions: this.filterAction,
        instance: this as StoreModel<S, A>,
        storeReducer: this.storeReducer,
      };
    }
  }

  private onTry(fn: () => any) {
    try {
      fn();
    } catch (e) {
      console.log(e);
    }
  }

  protected storeReducer = (state: S, action: TCaseAction) => {
    this._state = cloneDeep(state);
    this.onTry(() => this._actions[action.type.split('/')[0]][action.type](action.payload));
    return this._state;
  };

  get proxyState() {
    return new Proxy(Object.seal(this._state), {});
  }

  protected getState() {
    return this._state;
  }

  protected setState(state: S) {
    this._state = cloneDeep({ ...this._state, ...state });
  }

  private setMiddleware<T extends object = { action?: (props: TMiddlewareProps<S, A>) => any }>(...middleware: T[]) {
    return (this.middlewares = this.middlewares.concat(middleware));
  }

  createMiddleware(...fnArr: ((props: TMiddlewareProps<S, A>) => any)[]) {
    return this.setMiddleware(...fnArr.map((action) => ({ action: action.bind(this) })));
  }

  protected checkSliceName(name: keyof S) {
    if (this._state) {
      return name in this._state;
    }
  }

  private get filterAction() {
    const clone = cloneDeep<A>(this._actions);
    for (const name in clone) {
      for (const action in clone[name]) {
        if (action.includes(`${name}/`)) {
          clone[name][action] = undefined;
          delete clone[name][action];
        }
      }
    }
    return clone;
  }
}

export const Store = <S extends TStore, A extends Record<string, TAllActions>>(state: S, appActions: A) => {
  const { instance, actions, context: Context, storeReducer } = Container.get<StoreModel<S, A>>('StoreModel')['init'](state, appActions);

  const useReducerWithMiddleware = (): [S, TDispatch<A[keyof A], TActionString<A>>] => {
    const [_, dispatch] = React.useReducer(storeReducer, instance.proxyState);
    const dispatchWithMiddleware: TDispatch<A[keyof A], TActionString<A>> = async (action) => {
      const middlewares = instance['middlewares'];
      await Promise.allSettled(
        middlewares
          .map((item) =>
            item.action({
              action,
              state: instance.proxyState,
              actions,
              dispatch,
            })
          )
          .concat({ action: async () => dispatch(action) }.action())
      );
    };
    return [instance.proxyState, dispatchWithMiddleware];
  };

  const StoreProvider: React.FC<{
    children?: React.ReactNode;
  }> = ({ children }) => {
    const [state, dispatch] = useReducerWithMiddleware();
    const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return <Context.Provider value={Object.seal(value)}>{children}</Context.Provider>;
  };

  function useStore<T>(fn: (state: S) => T): [state: T, { actions: A; dispatch: TDispatch }];
  function useStore(): [state: S, { actions: A; dispatch: TDispatch }];
  function useStore<T>(fn?: (state: S) => T) {
    const { dispatch } = React.useContext(Context);
    if (fn) {
      return [fn(instance.proxyState), { dispatch, actions }];
    }
    return [instance.proxyState, { dispatch, actions }];
  }

  return { useStore, StoreProvider, storeInstance: instance };
};
