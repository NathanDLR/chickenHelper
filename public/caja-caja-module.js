(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["caja-caja-module"],{

/***/ "8IFX":
/*!***************************************************!*\
  !*** ./src/app/pages/caja/caja-routing.module.ts ***!
  \***************************************************/
/*! exports provided: CajaPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CajaPageRoutingModule", function() { return CajaPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _caja_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./caja.page */ "ihWw");




const routes = [
    {
        path: '',
        component: _caja_page__WEBPACK_IMPORTED_MODULE_3__["CajaPage"]
    }
];
let CajaPageRoutingModule = class CajaPageRoutingModule {
};
CajaPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CajaPageRoutingModule);



/***/ }),

/***/ "M4at":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/caja/caja.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Caja</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-title>¿Desea terminar el día de hoy?</ion-card-title>\n    <ion-button>Cerrar</ion-button>\n  </ion-card>\n</ion-content>\n");

/***/ }),

/***/ "Xh6T":
/*!*******************************************!*\
  !*** ./src/app/pages/caja/caja.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWphLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "ihWw":
/*!*****************************************!*\
  !*** ./src/app/pages/caja/caja.page.ts ***!
  \*****************************************/
/*! exports provided: CajaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CajaPage", function() { return CajaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_caja_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./caja.page.html */ "M4at");
/* harmony import */ var _caja_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./caja.page.scss */ "Xh6T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let CajaPage = class CajaPage {
    constructor() { }
    ngOnInit() {
    }
};
CajaPage.ctorParameters = () => [];
CajaPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-caja',
        template: _raw_loader_caja_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_caja_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CajaPage);



/***/ }),

/***/ "paSx":
/*!*******************************************!*\
  !*** ./src/app/pages/caja/caja.module.ts ***!
  \*******************************************/
/*! exports provided: CajaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CajaPageModule", function() { return CajaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _caja_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./caja-routing.module */ "8IFX");
/* harmony import */ var _caja_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./caja.page */ "ihWw");







let CajaPageModule = class CajaPageModule {
};
CajaPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _caja_routing_module__WEBPACK_IMPORTED_MODULE_5__["CajaPageRoutingModule"]
        ],
        declarations: [_caja_page__WEBPACK_IMPORTED_MODULE_6__["CajaPage"]]
    })
], CajaPageModule);



/***/ })

}]);
//# sourceMappingURL=caja-caja-module.js.map