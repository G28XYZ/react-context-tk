/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash"), require("react")) : factory(root["lodash"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, (__WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/create-action/index.ts":
/*!************************************!*\
  !*** ./src/create-action/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAction: () => (/* binding */ createAction)\n/* harmony export */ });\nvar createAction = function (state, fields) {\n    // const fn: TSliceAction<T, Pick<T, K>> = (state, payload) => {};\n    // return fn;\n};\n\n\n//# sourceURL=webpack://react-context-tk/./src/create-action/index.ts?");

/***/ }),

/***/ "./src/create-slice/index.ts":
/*!***********************************!*\
  !*** ./src/create-slice/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Slice: () => (/* binding */ Slice),\n/* harmony export */   createSlice: () => (/* binding */ createSlice)\n/* harmony export */ });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Slice = /** @class */ (function () {\n    function Slice(props) {\n        this._initState = undefined;\n        this._name = undefined;\n        this._reducers = undefined;\n        this._actions = {};\n        this._name = props.name;\n        this._reducers = props.reducers;\n        this._initState = props.initState;\n    }\n    Object.defineProperty(Slice.prototype, \"actions\", {\n        get: function () {\n            return this._actions;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Slice.prototype, \"name\", {\n        get: function () {\n            return this._name;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Slice.prototype, \"reducers\", {\n        get: function () {\n            return this._reducers;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Slice.prototype, \"state\", {\n        get: function () {\n            return this._initState;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Slice.prototype, \"reducer\", {\n        get: function () {\n            var _this = this;\n            var sliceName = this.name;\n            var reducers = this.reducers;\n            var _loop_1 = function (f) {\n                var _a, _b;\n                var fn = reducers[f];\n                var originalFuncName = fn.name;\n                if (!originalFuncName.includes(\"\".concat(sliceName, \"/\").concat(originalFuncName))) {\n                    var sliceFuncName_1 = \"\".concat(sliceName, \"/\").concat(originalFuncName);\n                    Object.defineProperty(fn, 'name', {\n                        value: sliceFuncName_1,\n                        writable: false,\n                        enumerable: false,\n                    });\n                    lodash__WEBPACK_IMPORTED_MODULE_0___default().assign(this_1._actions, (_a = {},\n                        _a[sliceFuncName_1] = function (payload) {\n                            var _a;\n                            fn(_this.state, payload);\n                            return _a = {}, _a[sliceName] = _this.state, _a;\n                        },\n                        _a));\n                    lodash__WEBPACK_IMPORTED_MODULE_0___default().assign(this_1._actions, (_b = {},\n                        _b[originalFuncName] = function (payload) {\n                            return { type: sliceFuncName_1, payload: payload };\n                        },\n                        _b));\n                }\n            };\n            var this_1 = this;\n            for (var f in reducers) {\n                _loop_1(f);\n            }\n            return this.state;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Slice.prototype, \"store\", {\n        get: function () {\n            var _a;\n            return _a = {}, _a[this.name] = this.reducer, _a;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Slice;\n}());\n\nfunction createSlice(props) {\n    return new Slice(props);\n}\n\n\n//# sourceURL=webpack://react-context-tk/./src/create-slice/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ESArray: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.ESArray),\n/* harmony export */   ESDate: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.ESDate),\n/* harmony export */   ESString: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.ESString),\n/* harmony export */   IsArray: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.IsArray),\n/* harmony export */   IsEmpty: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.IsEmpty),\n/* harmony export */   IsFunction: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_3__.IsFunction),\n/* harmony export */   Slice: () => (/* reexport safe */ _create_slice__WEBPACK_IMPORTED_MODULE_0__.Slice),\n/* harmony export */   Store: () => (/* reexport safe */ _store__WEBPACK_IMPORTED_MODULE_1__.Store),\n/* harmony export */   StoreClass: () => (/* reexport safe */ _store__WEBPACK_IMPORTED_MODULE_1__.StoreClass),\n/* harmony export */   createAction: () => (/* reexport safe */ _create_action__WEBPACK_IMPORTED_MODULE_4__.createAction),\n/* harmony export */   createSlice: () => (/* reexport safe */ _create_slice__WEBPACK_IMPORTED_MODULE_0__.createSlice)\n/* harmony export */ });\n/* harmony import */ var _create_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-slice */ \"./src/create-slice/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./src/store/index.ts\");\n/* harmony import */ var _store_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/types */ \"./src/store/types.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _create_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-action */ \"./src/create-action/index.ts\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://react-context-tk/./src/index.ts?");

/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Store: () => (/* binding */ Store),\n/* harmony export */   StoreClass: () => (/* binding */ StoreClass)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __read = (undefined && undefined.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\n\n// const logger = (action: IAction) => {\n// \tconsole.log(\"logger:\", action);\n// };\nvar StoreClass = /** @class */ (function () {\n    function StoreClass(state, actions) {\n        var _this = this;\n        this.actions = undefined;\n        this.state = undefined;\n        this.defaultContext = { state: this.state, dispatch: function () { return ({}); } };\n        this.isInit = false;\n        this.middlewares = [];\n        this.context = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(this.defaultContext);\n        this.storeReducer = function (state, action) {\n            var fn = _this.actions[action.type];\n            var newState = lodash__WEBPACK_IMPORTED_MODULE_1___default().assign(state, fn(action.payload));\n            return lodash__WEBPACK_IMPORTED_MODULE_1___default().cloneDeep(newState);\n        };\n        this.storeProvider = function (_a) {\n            var children = _a.children;\n            var _b = __read(_this.useReducerWithMiddleware(), 2), state = _b[0], dispatch = _b[1];\n            var value = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () { return ({ state: state, dispatch: dispatch }); }, [state, dispatch]);\n            return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_this.context.Provider, { value: value, children: children });\n        };\n        this.actions = actions;\n        this.state = state;\n    }\n    StoreClass.prototype.useReducerWithMiddleware = function () {\n        var _this = this;\n        var _a = __read(react__WEBPACK_IMPORTED_MODULE_0___default().useReducer(this.storeReducer, this.state), 2), state = _a[0], dispatch = _a[1];\n        var dispatchWithMiddleware = function (action) { return __awaiter(_this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                this.middlewares.forEach(function (middlewareModel) { return middlewareModel.action({ action: action, state: state, actions: _this.actions, dispatch: dispatch }); });\n                dispatch(action);\n                return [2 /*return*/];\n            });\n        }); };\n        return [state, dispatchWithMiddleware];\n    };\n    StoreClass.prototype.useStore = function (fn) {\n        var _a = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(this.context), state = _a.state, dispatch = _a.dispatch;\n        if (fn) {\n            return [fn(state), { dispatch: dispatch, actions: this.actions }];\n        }\n        return [state, { dispatch: dispatch, actions: this.actions }];\n    };\n    Object.defineProperty(StoreClass.prototype, \"store\", {\n        get: function () {\n            return { useStore: this.useStore.bind(this), StoreProvider: this.storeProvider };\n        },\n        enumerable: false,\n        configurable: true\n    });\n    StoreClass.prototype.setMiddlware = function () {\n        var _a;\n        var middleware = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            middleware[_i] = arguments[_i];\n        }\n        (_a = this.middlewares).push.apply(_a, __spreadArray([], __read(middleware), false));\n    };\n    return StoreClass;\n}());\n\nvar Store = function (state, actions) {\n    var instance = new StoreClass(state, actions);\n    // console.log(instance);\n    return lodash__WEBPACK_IMPORTED_MODULE_1___default().assign({}, instance.store, { storeInstance: instance });\n};\n// export const Store = <S extends object, A extends Record<string, Function>>(store: S, actions: A) => {\n// \tconst Context = React.createContext<{\n// \t\tstate: typeof store;\n// \t\tdispatch: TDispatch;\n// \t}>({ state: store, dispatch: () => ({}) });\n// \tconst storeReducer: React.Reducer<typeof store, TCaseAction> = (state, action) => {\n// \t\tconst fn = actions[action.type];\n// \t\tconst newState = _.assign(state, fn(action.payload));\n// \t\treturn _.cloneDeep(newState);\n// \t};\n// \t// const MiddlewareModelInstance = Container.get<TMiddleware>(\"MiddlewareModel\");\n// \t// MiddlewareModelInstance.actions = actions;\n// \t// const useReducerWithMiddleware = (\n// \t// \treducer: typeof storeReducer,\n// \t// \tinitialState: typeof store\n// \t// \t// middlewares: TMiddleware[] = []\n// \t// ): [typeof store, TDispatch] => {\n// \t// \tconst [state, dispatch] = useReducer(reducer, initialState);\n// \t// \t// const dispatchWithMiddleware = (action: TCaseAction<A>) => {\n// \t// \t// \tmiddlewares.forEach((middlewareModel) => middlewareModel.middleware(action));\n// \t// \t// \tdispatch(action);\n// \t// \t// };\n// \t// \treturn [state, dispatch];\n// \t// };\n// \tconst StoreProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {\n// \t\t// const [state, dispatch] = useReducerWithMiddleware(storeReducer, store);\n// \t\tconst [state, dispatch] = React.useReducer(storeReducer, store);\n// \t\tconst value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);\n// \t\t// MiddlewareModelInstance.dispatch === undefined && (MiddlewareModelInstance.dispatch = dispatch);\n// \t\t// return <Context.Provider value={value}>{children}</Context.Provider>;\n// \t\treturn React.createElement(Context.Provider, { value, children });\n// \t};\n// \tfunction useStore<T>(fn: (state: S) => T): [state: T, { actions: A; dispatch: TDispatch }];\n// \tfunction useStore(): [state: S, { actions: A; dispatch: TDispatch }];\n// \tfunction useStore<T>(fn?: (state: S) => T) {\n// \t\tlet { state, dispatch } = React.useContext(Context);\n// \t\tif (fn) {\n// \t\t\treturn [fn(state), { dispatch, actions }];\n// \t\t}\n// \t\treturn [state, { dispatch, actions }];\n// \t}\n// \treturn { useStore, StoreProvider };\n// };\n\n\n//# sourceURL=webpack://react-context-tk/./src/store/index.ts?");

/***/ }),

/***/ "./src/store/types.ts":
/*!****************************!*\
  !*** ./src/store/types.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://react-context-tk/./src/store/types.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ESArray: () => (/* binding */ ESArray),\n/* harmony export */   ESDate: () => (/* binding */ ESDate),\n/* harmony export */   ESString: () => (/* binding */ ESString),\n/* harmony export */   IsArray: () => (/* binding */ IsArray),\n/* harmony export */   IsEmpty: () => (/* binding */ IsEmpty),\n/* harmony export */   IsFunction: () => (/* binding */ IsFunction)\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/utils/types.ts\");\n\nvar ESArray = Array;\nvar ESString = String;\nvar ESDate = Date;\nvar IsArray = 'isArray' in ESArray ? ESArray.isArray : function (value) { return toString.call(value) === '[object Array]'; };\nvar IsFunction = typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function'\n    ? function (value) { return !!value && toString.call(value) === '[object Function]'; }\n    : function (value) { return !!value && typeof value === 'function'; };\nvar IsEmpty = function (value, allowEmptyString) {\n    return value == null || (!allowEmptyString ? value === '' : false) || (IsArray(value) && value.length === 0);\n};\n\n\n//# sourceURL=webpack://react-context-tk/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/types.ts":
/*!****************************!*\
  !*** ./src/utils/types.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://react-context-tk/./src/utils/types.ts?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});