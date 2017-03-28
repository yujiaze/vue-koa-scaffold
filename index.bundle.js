module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_co__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_co___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_co__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(9);



/* harmony default export */ __webpack_exports__["a"] = (function* (next) {
    let timeout
    yield Promise.race([
        new Promise((resolve, reject) => {
            __WEBPACK_IMPORTED_MODULE_0_co__(function* () {
                yield next
            }).then(() => {
                clearTimeout(timeout)
                resolve()
            }, e => __WEBPACK_IMPORTED_MODULE_1__logger__["a" /* default */].error(e))
        }),
        new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                this.status = 408
                this.body = 'request timeout'
                reject(new Error('request timeout'))
            }, 10000)
        }),
    ])
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa-send");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("koa-views");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const config = {
    base: {
        LOG_LEVEL: 'debug'
    },
    dev: {
        LOG_LEVEL: 'debug'
    },
    test: {
        LOG_LEVEL: 'info'
    },
    production: {
        LOG_LEVEL: 'info'
    }
}


var env = process.env.NODE_ENV || 'dev'

/* harmony default export */ __webpack_exports__["a"] = (Object.assign({}, config['base'], config[env]));

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_middlewares_timeout__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_views__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_views___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_views__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_static__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_koa_router__);





var app = new __WEBPACK_IMPORTED_MODULE_0_koa__()

// Must be used before any router is used
app.use(__WEBPACK_IMPORTED_MODULE_2_koa_views___default()('./build', {
    // map: {
    //     html: 'pug'
    // },
    // extension: 'pug'
}))



var send = __webpack_require__(3);


// app.use(staticMdr(path.join(__dirname, '/build/'), {

// }))



const router = new __WEBPACK_IMPORTED_MODULE_5_koa_router___default.a()

router.get('/', function* (next) {
    yield this.render('index.html')
})


app.use(router.routes())
    .use(router.allowedMethods())

app.use(function* () {
    yield send(this, this.path, { root: __dirname });
});

app.use(__WEBPACK_IMPORTED_MODULE_1__lib_middlewares_timeout__["a" /* default */])

app.listen(3000)

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_winston__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_winston___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_winston__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__conf_config__ = __webpack_require__(7);



let logger = new (__WEBPACK_IMPORTED_MODULE_0_winston__["Logger"])({ exitOnError: false })

logger.level = __WEBPACK_IMPORTED_MODULE_1__conf_config__["a" /* default */].LOG_LEVEL

/* harmony default export */ __webpack_exports__["a"] = (logger);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })
/******/ ]);