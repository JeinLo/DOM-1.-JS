/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   loginUser: () => (/* binding */ loginUser),\n/* harmony export */   postComment: () => (/* binding */ postComment)\n/* harmony export */ });\nfunction getComments() {\r\n    return fetch(\"https://wedev-api.sky.pro/api/v1/nane-akopyan/comments\", {\r\n        method: \"GET\",\r\n    }).then((response) => {\r\n        return response.json();\r\n    });\r\n}\r\n\r\nfunction postComment({ name, date, text }) {\r\n    return fetch(\"https://wedev-api.sky.pro/api/v1/nane-akopyan/comments\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            name: name,\r\n            date: date,\r\n            text: text,\r\n            likesQuantity: 0,\r\n            isLiked: false,\r\n        }),\r\n    }).then((response) => {\r\n        console.log(response);\r\n        if (response.status === 400) {\r\n            throw new Error(\"Плохой запрос\");\r\n        }\r\n        if (response.status === 500) {\r\n            throw new Error(\"Сервер сломался\");\r\n        } else {\r\n            return response.json();\r\n        }\r\n    });\r\n}\r\n\r\nfunction loginUser({ login, password}) {\r\n    return fetch(\"https://wedev-api.sky.pro/api/user/login\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            login: login,\r\n            password: password,\r\n        }),\r\n    }).then((response) => {\r\n        console.log(response);\r\n        if (response.status === 400) {\r\n            throw new Error(\"Неправильный логин или пароль\");\r\n        } else {\r\n            return response.json();\r\n        }\r\n    }); \r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./date.js":
/*!*****************!*\
  !*** ./date.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCommentDate: () => (/* binding */ getCommentDate)\n/* harmony export */ });\nconst getCommentDate = (date) => {\n    const currentDate = date ? new Date(date) : new Date();\n    let dd = currentDate.getDate();\n    if (dd < 10) dd = \"0\" + dd;\n    let mm = currentDate.getMonth() + 1;\n    if (mm < 10) mm = \"0\" + mm;\n    let yy = currentDate.getFullYear() % 100;\n    if (yy < 10) yy = \"0\" + yy;\n    let hour = currentDate.getHours();\n    if (hour < 10) hour = \"0\" + hour;\n    let minute = currentDate.getMinutes();\n    if (minute < 10) minute = \"0\" + minute;\n    return dd + \".\" + mm + \".\" + yy + \" \" + hour + \":\" + minute;\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./date.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   likeEventListener: () => (/* binding */ likeEventListener),\n/* harmony export */   renderApp: () => (/* binding */ renderApp),\n/* harmony export */   replyEventListener: () => (/* binding */ replyEventListener),\n/* harmony export */   setUser: () => (/* binding */ setUser),\n/* harmony export */   user: () => (/* binding */ user)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date.js */ \"./date.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _renderForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderForm.js */ \"./renderForm.js\");\n\n\n\n\n//import { format } from \"date-fns\";\n\nlet user = null\nconst setUser = (value) => {\n    user = value\n}\n\nfunction renderApp () {\n    const container = document.querySelector(\".container\");\n    container.innerHTML = `<ul\n    class=\"comments\"\n    id=\"list\"\n   >\n        <li>Комментарии загружаются...</li>\n   </ul>\n        <div class=\"form\">\n   </div>`;\n   fetchPromiseGet();\n   (0,_renderForm_js__WEBPACK_IMPORTED_MODULE_3__.renderForm)()\n}\n\nlet comments = [];\n\nconst fetchPromiseGet = () => {\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)()\n    .then((responseData) => {\n        const appComments = responseData.comments.map((comment) => {\n        return {\n            name: comment.author.name,\n            date: (0,_date_js__WEBPACK_IMPORTED_MODULE_1__.getCommentDate)(comment.date),\n            text: comment.text,\n            likesQuantity: comment.likes,\n            isLiked: false,\n        };\n        });\n        console.log(responseData);\n        comments = appComments;\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)({ comments, likeEventListener, replyEventListener });\n    });\n};\n\nrenderApp();\n\nconst likeEventListener = () => {\n    const likeElements = document.querySelectorAll(\".like-button\");\n    for (const likeElement of likeElements) {\n        likeElement.addEventListener(\"click\", (event) => {\n            event.stopPropagation();\n            const index = likeElement.dataset.index;\n            if (comments[index].isLiked) {\n                comments[index].isLiked = false;\n                comments[index].likesQuantity -= 1;\n            } else {\n                comments[index].isLiked = true;\n                comments[index].likesQuantity += 1;\n            }\n            (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)({ comments, likeEventListener, replyEventListener });\n        });\n    }\n};\n\nconst replyEventListener = () => {\n    const commentElements = document.querySelectorAll(\".comment\");\n    for (const commentElement of commentElements) {\n        commentElement.addEventListener(\"click\", (event) => {\n            event.stopPropagation();\n            const index = commentElement.dataset.index;\n            textElement.value = `> ${comments[index].text}, ${comments[index].name}, `;\n        });\n    }\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date.js */ \"./date.js\");\n\n\n\nconst renderComments = ({ comments, likeEventListener, replyEventListener }) => {\n    const listElement = document.getElementById(\"list\");\n    const commentsHtml = comments\n    .map((comment, index) => {\n        return `<li class=\"comment\" data-index=${index}>\n                        <div class=\"comment-header\">\n                            <div>${comment.name}</div>\n                            <div>${comment.date}</div>\n                        </div>\n                        <div class=\"comment-body\">\n                            <div class=\"comment-text\">\n                            ${comment.text}\n                            </div>\n                        </div>\n                        <div class=\"comment-footer\">\n                            <div class=\"likes\">\n                            <span class=\"likes-counter\">${\n                            comment.likesQuantity\n                            }</span>\n                            <button class=\"like-button ${\n                            comment.isLiked ? \"-active-like\" : \"\"\n                            }\" data-index=\"${index}\"></button>\n                            </div>\n                        </div>\n                    </li>`;\n    })\n    .join(\"\");\n    listElement.innerHTML = commentsHtml;\n\n    const nameElement = document.getElementById(\"add-form-name\");\n    const textElement = document.getElementById(\"add-form-text\");\n    const buttonElement = document.getElementById(\"add-form-button\");\n\n\n    buttonElement.addEventListener(\"click\", () => {\n        const date = (0,_date_js__WEBPACK_IMPORTED_MODULE_1__.getCommentDate)();\n\n        nameElement.classList.remove(\"error\");\n        textElement.classList.remove(\"error\");\n        if (nameElement.value === \"\" || textElement.value === \"\") {\n            nameElement.classList.add(\"error\");\n            textElement.classList.add(\"error\");\n            return;\n        }\n        const fetchPromisePost = () => {\n            buttonElement.disabled = true;\n            buttonElement.textContent = \"Комментарий публикуется...\";\n\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postComment)({\n                name: nameElement.value.replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\"),\n                text: textElement.value.replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\"),\n            })\n            .then(() => {\n                return fetchPromiseGet();\n            })\n            .then(() => {\n                textElement.value = \"\";\n                nameElement.value = \"\";\n                buttonElement.disabled = false;\n                buttonElement.textContent = \"Написать\";\n            })\n            .catch((error) => {\n                if (error.message === \"Сервер сломался\") {\n                    alert(\"Сервер сломался попробуй позже.\");\n                    buttonElement.disabled = false;\n                    buttonElement.textContent = \"Написать\";\n                    return;\n                }\n                if (error.message === \"Плохой запрос\") {\n                    alert(\"Ошибка в запросе, исправь данные и попробуй снова. Имя и текст должны содержать минимум 3 символа.\");\n                    buttonElement.disabled = false;\n                    buttonElement.textContent = \"Написать\";\n                    return;\n                } else {\n                    alert(\"Кажется пропал интернет.\");\n                }\n            });\n        };\n        fetchPromisePost();\n    });\n    likeEventListener();\n    replyEventListener();\n};\n\n\n    \n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./render.js?");

/***/ }),

/***/ "./renderForm.js":
/*!***********************!*\
  !*** ./renderForm.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderForm: () => (/* binding */ renderForm)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\n\r\n\r\n\r\nconst renderForm = () => {\r\n    const container = document.querySelector(\".form\")\r\n    container.innerHTML = _main_js__WEBPACK_IMPORTED_MODULE_0__.user\r\n     ? `<div class=\"add-form\">\r\n    <input\r\n        type=\"text\"\r\n        id=\"add-form-name\"\r\n        class=\"add-form-name\"\r\n        placeholder=\"Введите ваше имя\"\r\n    />\r\n    <textarea\r\n        id=\"add-form-text\"\r\n        type=\"textarea\"\r\n        class=\"add-form-text\"\r\n        placeholder=\"Введите ваш коментарий\"\r\n        rows=\"4\"\r\n    ></textarea>\r\n    <div class=\"add-form-row\">\r\n        <button\r\n        class=\"add-form-button\"\r\n        id=\"add-form-button\"\r\n        >\r\n            Написать\r\n        </button>\r\n    </div>`\r\n     : `<div class=\"entryForm\">Чтобы оставить комментарий, <button class=\"entryButton\" >авторизуйтесь</button></div>`;\r\n     const entryButton = document.querySelector(\".entryButton\");\r\n     if (entryButton) {\r\n        entryButton.addEventListener(\"click\", (event) => {\r\n            event.preventDefault();\r\n            (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)()\r\n        })\r\n     }\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./renderForm.js?");

/***/ }),

/***/ "./renderLogin.js":
/*!************************!*\
  !*** ./renderLogin.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n\r\n\r\n\r\nconst renderLogin = () => {\r\n    const container = document.querySelector(\".container\");\r\n    container.innerHTML = ` <div class=\"add-form\">\r\n        <input\r\n            type=\"text\"\r\n            id=\"add-form-login\"\r\n            class=\"add-form-login\"\r\n            placeholder=\"Введите ваш логин\"\r\n        />\r\n        <input\r\n            id=\"add-form-password\"\r\n            type=\"password\"\r\n            class=\"add-form-password\"\r\n            placeholder=\"Введите ваш пароль\"\r\n        />\r\n        <div class=\"add-form-row\">\r\n            <button\r\n            class=\"add-form-button\"\r\n            id=\"add-form-button\"\r\n            >\r\n            Войти\r\n            </button>\r\n        </div>`;\r\n    const loginInputElement = document.querySelector(\".add-form-login\");\r\n    const passwordInputElement = document.querySelector(\".add-form-password\");\r\n    const loginButton = document.querySelector(\".add-form-button\");\r\n    if (loginButton) {\r\n        loginButton.addEventListener(\"click\", (event) => {\r\n            event.preventDefault();\r\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.loginUser)({\r\n                login: loginInputElement.value,\r\n                password: passwordInputElement.value,\r\n            }).then((response) => {\r\n                if (response.status === 400) {\r\n                    throw new Error(\"Неправильный логин или пароль\");\r\n                } else {\r\n                    (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.setUser)(response.user.token);\r\n                    console.log(_main_js__WEBPACK_IMPORTED_MODULE_1__.user);\r\n                    (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.renderApp)();\r\n                }\r\n            }).catch((error) => {\r\n                if (error.message === \"Неправильный логин или пароль\") {\r\n                    alert(\"Неправильный логин или пароль.\");\r\n                }\r\n            });\r\n        });\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderLogin.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;