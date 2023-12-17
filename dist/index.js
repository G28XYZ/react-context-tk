import { cloneDeep as l, assign as y } from "lodash";
import b, { Service as g, Inject as M } from "typedi";
import h from "react";
function _(i, t, e, s) {
  var r = arguments.length, n = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, e) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    n = Reflect.decorate(i, t, e, s);
  else
    for (var a = i.length - 1; a >= 0; a--)
      (o = i[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, e, n) : o(t, e)) || n);
  return r > 3 && n && Object.defineProperty(t, e, n), n;
}
function v(i, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(i, t);
}
function S(i, t, e, s) {
  function r(n) {
    return n instanceof e ? n : new e(function(o) {
      o(n);
    });
  }
  return new (e || (e = Promise))(function(n, o) {
    function a(c) {
      try {
        u(s.next(c));
      } catch (d) {
        o(d);
      }
    }
    function j(c) {
      try {
        u(s.throw(c));
      } catch (d) {
        o(d);
      }
    }
    function u(c) {
      c.done ? n(c.value) : r(c.value).then(a, j);
    }
    u((s = s.apply(i, t || [])).next());
  });
}
let f = class {
  constructor() {
    this._actions = void 0, this._state = void 0, this._defaultContext = { state: this._state, dispatch: () => ({}) }, this._isInit = !1, this._middlewares = [], this.context = h.createContext(this._defaultContext), this.storeReducer = (t, e) => (this._state = l(t), this.onTry(() => this._actions[e.type.split("/")[0]][e.type](e.payload)), this._state), this.storeProvider = ({ children: t }) => {
      const [e, s] = this.useReducerWithMiddleware(), r = h.useMemo(() => ({ state: e, dispatch: s }), [e, s]);
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
    const [t, e] = h.useReducer(this.storeReducer, this._state), s = (r) => S(this, void 0, void 0, function* () {
      yield Promise.allSettled(this._middlewares.map((n) => n.action.call(this, {
        action: r,
        state: this.proxyState,
        actions: this.filterAction,
        dispatch: e
      })).concat((() => S(this, void 0, void 0, function* () {
        return e(r);
      })).call(this)));
    });
    return [this._state, s];
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
    return this.setMiddleware(...t.map((e) => ({ action: e })));
  }
  checkSliceName(t) {
    if (this._state)
      return t in this._state;
  }
  get filterAction() {
    const t = l(this._actions);
    for (const e in t)
      for (const s in t[e])
        s.includes(`${e}/`) && (t[e][s] = void 0, delete t[e][s]);
    return t;
  }
};
f = _([
  g("StoreModel")
], f);
const P = (i, t) => b.get("StoreModel").init(i, t);
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
        const s = `${this.name}/${e}`, r = this._reducers[t].bind(this);
        y(this._sliceActions, {
          [s]: (n) => (r(this.state, n), { [this.name]: this.state })
        }), y(this._sliceActions, {
          [e]: (n) => ({ type: s, payload: n })
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
  v("design:type", f)
], m.prototype, "storeInstance", void 0);
m = _([
  g({ id: "SliceModel", transient: !0 })
], m);
function T(i) {
  return b.get("SliceModel").init(i);
}
const p = Array, w = "isArray" in p ? p.isArray : (i) => toString.call(i) === "[object Array]", A = typeof document < "u" && typeof document.getElementsByTagName("body") == "function" ? (i) => !!i && toString.call(i) === "[object Function]" : (i) => !!i && typeof i == "function", x = (i, t) => i == null || (t ? !1 : i === "") || w(i) && i.length === 0, C = {
  array: {
    IsArray: w
  },
  object: {
    IsEmpty: x,
    IsFunction: A
  }
};
export {
  P as Store,
  C as Utils,
  T as createSlice
};
