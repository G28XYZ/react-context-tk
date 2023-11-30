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

/***/ "./src/create-slice/index.ts":
/*!***********************************!*\
  !*** ./src/create-slice/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSlice: () => (/* binding */ createSlice)\n/* harmony export */ });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction createSlice(props) {\n    return {\n        initialState: props.initialState,\n        name: props.name,\n        reducers: props.reducers,\n        actions: {},\n        get reducer() {\n            var _this = this;\n            var sliceName = this.name;\n            var reducers = this.reducers;\n            var _loop_1 = function (f) {\n                var _a, _b;\n                var func = reducers[f];\n                var originalFuncName = func.name;\n                if (!originalFuncName.includes(\"\".concat(sliceName, \"/\").concat(originalFuncName))) {\n                    var sliceFuncName_1 = \"\".concat(sliceName, \"/\").concat(originalFuncName);\n                    Object.defineProperty(func, 'name', {\n                        value: sliceFuncName_1,\n                        writable: false,\n                        enumerable: false,\n                    });\n                    lodash__WEBPACK_IMPORTED_MODULE_0___default().assign(this_1.actions, (_a = {},\n                        _a[sliceFuncName_1] = function (payload) {\n                            var _a;\n                            func(_this.initialState, payload);\n                            return _a = {}, _a[sliceName] = _this.initialState, _a;\n                        },\n                        _a));\n                    lodash__WEBPACK_IMPORTED_MODULE_0___default().assign(this_1.actions, (_b = {},\n                        _b[originalFuncName] = function (payload) {\n                            console.log(sliceFuncName_1, payload);\n                            return { type: sliceFuncName_1, payload: payload };\n                        },\n                        _b));\n                }\n            };\n            var this_1 = this;\n            for (var f in reducers) {\n                _loop_1(f);\n            }\n            return this.initialState;\n        },\n    };\n}\n\n\n//# sourceURL=webpack://react-context-tk/./src/create-slice/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ESArray: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.ESArray),\n/* harmony export */   ESDate: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.ESDate),\n/* harmony export */   ESString: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.ESString),\n/* harmony export */   IsArray: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.IsArray),\n/* harmony export */   IsEmpty: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.IsEmpty),\n/* harmony export */   IsFunction: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.IsFunction),\n/* harmony export */   Store: () => (/* reexport safe */ _store__WEBPACK_IMPORTED_MODULE_1__.Store),\n/* harmony export */   createSlice: () => (/* reexport safe */ _create_slice__WEBPACK_IMPORTED_MODULE_0__.createSlice)\n/* harmony export */ });\n/* harmony import */ var _create_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-slice */ \"./src/create-slice/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ \"./src/store/index.tsx\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\n\n\n\n\n\n//# sourceURL=webpack://react-context-tk/./src/index.ts?");

/***/ }),

/***/ "./src/store/index.tsx":
/*!*****************************!*\
  !*** ./src/store/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Store: () => (/* binding */ Store)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/store/types.ts\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\nvar __read = (undefined && undefined.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\n\n\n\n// const logger = (action: IAction) => {\n// \tconsole.log(\"logger:\", action);\n// };\nvar Store = function (store, actions) {\n    var Context = react__WEBPACK_IMPORTED_MODULE_0___default().createContext({ state: store, dispatch: function () { return ({}); } });\n    var storeReducer = function (state, action) {\n        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion\n        console.log(action);\n        var fn = actions[action.type];\n        var newState = lodash__WEBPACK_IMPORTED_MODULE_2___default().assign(state, fn(action.payload));\n        return lodash__WEBPACK_IMPORTED_MODULE_2___default().cloneDeep(newState);\n    };\n    // const MiddlewareModelInstance = Container.get<TMiddleware>(\"MiddlewareModel\");\n    // MiddlewareModelInstance.actions = actions;\n    // const useReducerWithMiddleware = (\n    // \treducer: typeof storeReducer,\n    // \tinitialState: typeof store\n    // \t// middlewares: TMiddleware[] = []\n    // ): [typeof store, TDispatch] => {\n    // \tconst [state, dispatch] = useReducer(reducer, initialState);\n    // \t// const dispatchWithMiddleware = (action: TCaseAction<A>) => {\n    // \t// \tmiddlewares.forEach((middlewareModel) => middlewareModel.middleware(action));\n    // \t// \tdispatch(action);\n    // \t// };\n    // \treturn [state, dispatch];\n    // };\n    var StoreProvider = function (_a) {\n        var children = _a.children;\n        // const [state, dispatch] = useReducerWithMiddleware(storeReducer, store);\n        var _b = __read(react__WEBPACK_IMPORTED_MODULE_0___default().useReducer(storeReducer, store), 2), state = _b[0], dispatch = _b[1];\n        var value = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () { return ({ state: state, dispatch: dispatch }); }, [state, dispatch]);\n        // MiddlewareModelInstance.dispatch === undefined && (MiddlewareModelInstance.dispatch = dispatch);\n        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Context.Provider, { value: value }, children);\n    };\n    function useStore(fn) {\n        var _a = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(Context), state = _a.state, dispatch = _a.dispatch;\n        if (fn) {\n            return [fn(state), { dispatch: dispatch, actions: actions }];\n        }\n        return [state, { dispatch: dispatch, actions: actions }];\n    }\n    return { useStore: useStore, StoreProvider: StoreProvider };\n};\n\n\n//# sourceURL=webpack://react-context-tk/./src/store/index.tsx?");

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