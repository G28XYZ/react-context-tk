import { cloneDeep as h, assign as w } from "lodash";
import j, { Service as S, Inject as A } from "typedi";
import u from "react";
function _(s, t, e, i) {
  var o = arguments.length, n = o < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, e) : i, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    n = Reflect.decorate(s, t, e, i);
  else
    for (var l = s.length - 1; l >= 0; l--)
      (c = s[l]) && (n = (o < 3 ? c(n) : o > 3 ? c(t, e, n) : c(t, e)) || n);
  return o > 3 && n && Object.defineProperty(t, e, n), n;
}
function O(s, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(s, t);
}
function x(s, t, e, i) {
  function o(n) {
    return n instanceof e ? n : new e(function(c) {
      c(n);
    });
  }
  return new (e || (e = Promise))(function(n, c) {
    function l(r) {
      try {
        a(i.next(r));
      } catch (d) {
        c(d);
      }
    }
    function y(r) {
      try {
        a(i.throw(r));
      } catch (d) {
        c(d);
      }
    }
    function a(r) {
      r.done ? n(r.value) : o(r.value).then(l, y);
    }
    a((i = i.apply(s, t || [])).next());
  });
}
let m = class {
  constructor() {
    this._actions = void 0, this._state = void 0, this._defaultContext = { state: this._state, dispatch: () => ({}) }, this._isInit = !1, this.middlewares = [], this.context = u.createContext(this._defaultContext), this.storeReducer = (t, e) => (this._state = h(t), this.onTry(() => this._actions[e.type.split("/")[0]][e.type](e.payload)), this._state);
  }
  init(t, e) {
    if (this._isInit === !1)
      return this._isInit = !0, this._actions = e, this._state = h(t), {
        context: this.context,
        actions: this.filterAction,
        instance: this,
        storeReducer: this.storeReducer
      };
  }
  onTry(t) {
    try {
      t();
    } catch (e) {
      console.log(e);
    }
  }
  get proxyState() {
    return new Proxy(Object.seal(this._state), {});
  }
  getState() {
    return this._state;
  }
  setState(t) {
    this._state = h(Object.assign(Object.assign({}, this._state), t));
  }
  setMiddleware(...t) {
    return this.middlewares = this.middlewares.concat(t);
  }
  createMiddleware(...t) {
    return this.setMiddleware(...t.map((e) => ({ action: e.bind(this) })));
  }
  checkSliceName(t) {
    if (this._state)
      return t in this._state;
  }
  get filterAction() {
    const t = h(this._actions);
    for (const e in t)
      for (const i in t[e])
        i.includes(`${e}/`) && (t[e][i] = void 0, delete t[e][i]);
    return t;
  }
};
m = _([
  S("StoreModel")
], m);
var b;
let p = class {
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
    return this._name = t.name, this._reducers = t.reducers, this.storeInstance.setState({ [this._name]: h(t.initState) }), this;
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
        const i = `${this.name}/${e}`, o = this._reducers[t].bind(this);
        w(this._sliceActions, {
          [i]: (n) => (o(this.state, n), { [this.name]: this.state })
        }), w(this._sliceActions, {
          [e]: (n) => ({ type: i, payload: n })
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
  A("StoreModel"),
  O("design:type", typeof (b = typeof m < "u" && m) == "function" ? b : Object)
], p.prototype, "storeInstance", void 0);
p = _([
  S({ id: "SliceModel", transient: !0 })
], p);
function D(s) {
  return j.get("SliceModel").init(s);
}
let g = class {
  constructor() {
    this._actions = void 0, this._state = void 0, this._defaultContext = { state: this._state, dispatch: () => ({}) }, this._isInit = !1, this.middlewares = [], this.context = u.createContext(this._defaultContext), this.storeReducer = (t, e) => (this._state = h(t), this.onTry(() => this._actions[e.type.split("/")[0]][e.type](e.payload)), this._state);
  }
  init(t, e) {
    if (this._isInit === !1)
      return this._isInit = !0, this._actions = e, this._state = h(t), {
        context: this.context,
        actions: this.filterAction,
        instance: this,
        storeReducer: this.storeReducer
      };
  }
  onTry(t) {
    try {
      t();
    } catch (e) {
      console.log(e);
    }
  }
  get proxyState() {
    return new Proxy(Object.seal(this._state), {});
  }
  getState() {
    return this._state;
  }
  setState(t) {
    this._state = h(Object.assign(Object.assign({}, this._state), t));
  }
  setMiddleware(...t) {
    return this.middlewares = this.middlewares.concat(t);
  }
  createMiddleware(...t) {
    return this.setMiddleware(...t.map((e) => ({ action: e.bind(this) })));
  }
  checkSliceName(t) {
    if (this._state)
      return t in this._state;
  }
  get filterAction() {
    const t = h(this._actions);
    for (const e in t)
      for (const i in t[e])
        i.includes(`${e}/`) && (t[e][i] = void 0, delete t[e][i]);
    return t;
  }
};
g = _([
  S("StoreModel")
], g);
const q = (s, t) => {
  const { instance: e, actions: i, context: o, storeReducer: n } = j.get("StoreModel").init(s, t), c = () => {
    const [a, r] = u.useReducer(n, e.proxyState), d = (f) => x(void 0, void 0, void 0, function* () {
      const I = e.middlewares;
      yield Promise.allSettled(I.map((R) => R.action({
        action: f,
        state: e.proxyState,
        actions: i,
        dispatch: r
      })).concat({ action: () => x(void 0, void 0, void 0, function* () {
        return r(f);
      }) }.action()));
    });
    return [e.proxyState, d];
  }, l = ({ children: a }) => {
    const [r, d] = c(), f = u.useMemo(() => ({ state: r, dispatch: d }), [r, d]);
    return u.createElement(o.Provider, { value: Object.seal(f) }, a);
  };
  function y(a) {
    const { dispatch: r } = u.useContext(o);
    return a ? [a(e.proxyState), { dispatch: r, actions: i }] : [e.proxyState, { dispatch: r, actions: i }];
  }
  return { useStore: y, StoreProvider: l, storeInstance: e };
}, M = Array, v = "isArray" in M ? M.isArray : (s) => toString.call(s) === "[object Array]", E = typeof document < "u" && typeof document.getElementsByTagName("body") == "function" ? (s) => !!s && toString.call(s) === "[object Function]" : (s) => !!s && typeof s == "function", $ = (s, t) => s == null || (t ? !1 : s === "") || v(s) && s.length === 0, z = {
  array: {
    IsArray: v
  },
  object: {
    IsEmpty: $,
    IsFunction: E
  }
};
export {
  q as Store,
  z as Utils,
  D as createSlice
};
