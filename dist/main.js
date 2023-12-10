import { cloneDeep as l, assign as S } from "lodash";
import g, { Service as b, Inject as M } from "typedi";
import h from "react";
function _(i, t, e, n) {
  var r = arguments.length, s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, e) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    s = Reflect.decorate(i, t, e, n);
  else
    for (var a = i.length - 1; a >= 0; a--)
      (o = i[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(t, e, s) : o(t, e)) || s);
  return r > 3 && s && Object.defineProperty(t, e, s), s;
}
function j(i, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, t);
}
function y(i, t, e, n) {
  function r(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function a(c) {
      try {
        u(n.next(c));
      } catch (d) {
        o(d);
      }
    }
    function w(c) {
      try {
        u(n.throw(c));
      } catch (d) {
        o(d);
      }
    }
    function u(c) {
      c.done ? s(c.value) : r(c.value).then(a, w);
    }
    u((n = n.apply(i, t || [])).next());
  });
}
let f = class {
  constructor() {
    this._actions = void 0, this._state = void 0, this._defaultContext = { state: this._state, dispatch: () => ({}) }, this._isInit = !1, this._middlewares = [], this.context = h.createContext(this._defaultContext), this.storeReducer = (t, e) => (this._state = l(t), this.onTry(() => this._actions[e.type.split("/")[0]][e.type](e.payload)), this._state), this.storeProvider = ({ children: t }) => {
      const [e, n] = this.useReducerWithMiddleware(), r = h.useMemo(() => ({ state: e, dispatch: n }), [e, n]);
      return h.createElement(this.context.Provider, {
        value: Object.seal(r),
        children: t
      });
    };
  }
  init(t, e) {
    if (this._isInit === !1)
      return this._isInit = !0, this._actions = e, this._state = l(t), Object.assign(Object.assign({}, this.store), { storeInstance: this });
  }
  onTry(t) {
    try {
      t();
    } catch (e) {
      console.log(e);
    }
  }
  useReducerWithMiddleware() {
    const [t, e] = h.useReducer(this.storeReducer, this._state), n = (r) => y(this, void 0, void 0, function* () {
      console.log(r), yield Promise.allSettled(this._middlewares.map((s) => s.action.call(this, {
        action: r,
        state: this.proxyState,
        actions: this.filterAction,
        dispatch: e
      })).concat((() => y(this, void 0, void 0, function* () {
        return e(r);
      })).call(this)));
    });
    return [this._state, n];
  }
  useStore(t) {
    const { dispatch: e } = h.useContext(this.context);
    return t ? [t(this._state), { dispatch: e, actions: this.filterAction }] : [this._state, { dispatch: e, actions: this.filterAction }];
  }
  get proxyState() {
    return new Proxy(Object.seal(this._state), {});
  }
  get store() {
    return {
      useStore: this.useStore.bind(this),
      StoreProvider: Object.defineProperty(this.storeProvider, "name", {
        value: "StoreProvider"
      })
    };
  }
  getState() {
    return this._state;
  }
  setState(t) {
    this._state = l(Object.assign(Object.assign({}, this._state), t));
  }
  setMiddleware(...t) {
    return this._middlewares = this._middlewares.concat(t);
  }
  createMiddleware(...t) {
    return this.setMiddleware(t.map((e) => ({ action: e })));
  }
  checkSliceName(t) {
    if (this._state)
      return t in this._state;
  }
  get filterAction() {
    const t = l(this._actions);
    for (const e in t)
      for (const n in t[e])
        n.includes(`${e}/`) && (t[e][n] = void 0, delete t[e][n]);
    return t;
  }
};
f = _([
  b("StoreModel")
], f);
const R = (i, t) => g.get("StoreModel").init(i, t);
let m = class {
  constructor() {
    this.storeInstance = null, this._name = null, this._reducers = null, this._sliceActions = {};
  }
  init(t) {
    if (!t.name)
      throw Error("The slice name cannot be empty and must be set.");
    if (this.storeInstance.checkSliceName(t.name))
      throw Error(`The slice with the name '${t.name}' has already been created. The name '${t.name}' for the slice must be uniq, change another name slice.`);
    if (!/^[a-zA-Z \d.'-_]+$/g.test(t.name))
      throw Error(`The incorect name '${t.name}'. The name for the slice must be include only latin char, numbers and '-_.' symbols.`);
    return this._name = t.name, this._reducers = t.reducers, this.storeInstance.setState({ [this._name]: l(t.initState) }), this;
  }
  get actions() {
    return this._sliceActions;
  }
  get name() {
    return this._name;
  }
  get state() {
    return new Proxy(Object.seal(this.storeInstance.getState()[this.name]), {});
  }
  get reducer() {
    for (const t in this._reducers) {
      const e = this._reducers[t].name;
      if (!e.includes(`${this.name}/${e}`)) {
        const n = `${this.name}/${e}`, r = this._reducers[t].bind(this);
        S(this._sliceActions, {
          [n]: (s) => (r(this.state, s), { [this.name]: this.state })
        }), S(this._sliceActions, {
          [e]: (s) => ({ type: n, payload: s })
        });
      }
    }
    return this.state;
  }
  get sliceStore() {
    return { [this.name]: this.reducer };
  }
};
_([
  M("StoreModel"),
  j("design:type", f)
], m.prototype, "storeInstance", void 0);
m = _([
  b({ id: "SliceModel", transient: !0 })
], m);
function P(i) {
  return g.get("SliceModel").init(i);
}
const p = Array, $ = String, T = Date, v = "isArray" in p ? p.isArray : (i) => toString.call(i) === "[object Array]", C = typeof document < "u" && typeof document.getElementsByTagName("body") == "function" ? (i) => !!i && toString.call(i) === "[object Function]" : (i) => !!i && typeof i == "function", N = (i, t) => i == null || (t ? !1 : i === "") || v(i) && i.length === 0;
export {
  p as ESArray,
  T as ESDate,
  $ as ESString,
  v as IsArray,
  N as IsEmpty,
  C as IsFunction,
  R as Store,
  P as createSlice
};
