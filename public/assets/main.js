/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var styles = __webpack_require__(1);
var scripts = __webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

window.onload = function () {
    var form = document.querySelector('.main-form'),
        numbers = document.querySelector('input[name="numbers"]'),
        letters = document.querySelector('input[name="letters"]'),
        agreement = document.querySelector('input[name="agreement"]'),
        types = document.querySelectorAll('input[name="type"]'),
        lastType = document.querySelector('input[value="last"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = 0;

        for(var i = 0; i < types.length; i++) {
            if(types[i].checked === true) {
                type = types[i];
            }
        }

        var param = {
            num: numbers.value,
            let: letters.value,
            agr: agreement.chechecked,
            typ: type.value
        };

        ajaxPost('POST', '/test', param, function (data) {
            if(data.status === 500) {
                setError(data);
            } else {
                setSuccess(data);
            }
        })
    });

    function ajaxPost(method, url, param, callback) {
        var f = callback || function (data) {};
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if(this.readyState === 4) {
                if((this.status === 200)) {
                    var success = JSON.parse(this.responseText);
                    f(success);
                } else {
                    var error = JSON.parse(this.responseText);
                    error.status = this.status;
                    f(error);
                }
            }
        };

        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(param));
    }

    function setSuccess(success) {
        var btn = document.querySelector('form button');
        numbers.classList.remove('error');
        letters.classList.remove('error');

        var erNumRemove = document.querySelector('.er-num');
        if (erNumRemove) {
            erNumRemove.remove();
        }
        var erLetRemove = document.querySelector('.er-let');
        if (erLetRemove) {
            erLetRemove.remove();
        }
        var erAgrRemove = document.querySelector('.er-agr');
        if (erAgrRemove) {
            erAgrRemove.remove();
        }
        var erTypRemove = document.querySelector('.er-typ');
        if (erTypRemove) {
            erTypRemove.remove();
        }

        var successBlock = document.createElement('div');
        successBlock.className = 'success';
        successBlock.innerHTML = success.message;
        insertAfter(successBlock, btn)
    }

    function setError(error) {
        numbers.classList.remove('error');
        letters.classList.remove('error');

        if (document.querySelector('.success')) {
            document.querySelector('.success').remove();
        }

        if (error.num) {
            numbers.classList.add('error');
            if (!document.querySelector('.er-num')) {
                var erNum = document.createElement('div');
                erNum.className = 'er-num';
                erNum.innerHTML = error.num;
                insertAfter(erNum, numbers);
            }
        } else {
            var erNumRemove = document.querySelector('.er-num');
            if (erNumRemove) {
                erNumRemove.remove();
            }
        }

        if (error.let) {
            letters.classList.add('error');
            if (!document.querySelector('.er-let')) {
                var erLet = document.createElement('div');
                erLet.className = 'er-let';
                erLet.innerHTML = error.let;
                insertAfter(erLet, letters);
            }
        } else {
            var erLetRemove = document.querySelector('.er-let');
            if (erLetRemove) {
                erLetRemove.remove();
            }
        }

        if (error.agr) {
            if (!document.querySelector('.er-agr')) {
                var erAgr = document.createElement('div');
                erAgr.className = 'er-agr';
                erAgr.innerHTML = error.agr;
                insertAfter(erAgr, agreement);
            }
        } else {
            var erAgrRemove = document.querySelector('.er-agr');
            if (erAgrRemove) {
                erAgrRemove.remove();
            }
        }

        if (error.typ) {
            if (!document.querySelector('.er-typ')) {
                var erTyp = document.createElement('div');
                erTyp.className = 'er-typ';
                erTyp.innerHTML = error.typ;
                insertAfter(erTyp, lastType);
            }
        } else {
            var erTypRemove = document.querySelector('.er-typ');
            if (erTypRemove) {
                erTypRemove.remove();
            }
        }
        alert('Error server: ' + error.status);
    }

    function insertAfter(elem, refElem) {
        return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map