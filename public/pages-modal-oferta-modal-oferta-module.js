(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-modal-oferta-modal-oferta-module"],{

/***/ "UVP/":
/*!*******************************************************************!*\
  !*** ./src/app/pages/modal-oferta/modal-oferta-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ModalOfertaPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalOfertaPageRoutingModule", function() { return ModalOfertaPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _modal_oferta_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal-oferta.page */ "cmSm");




const routes = [
    {
        path: '',
        component: _modal_oferta_page__WEBPACK_IMPORTED_MODULE_3__["ModalOfertaPage"]
    }
];
let ModalOfertaPageRoutingModule = class ModalOfertaPageRoutingModule {
};
ModalOfertaPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ModalOfertaPageRoutingModule);



/***/ }),

/***/ "l0jK":
/*!***********************************************************!*\
  !*** ./src/app/pages/modal-oferta/modal-oferta.module.ts ***!
  \***********************************************************/
/*! exports provided: ModalOfertaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalOfertaPageModule", function() { return ModalOfertaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _modal_oferta_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modal-oferta-routing.module */ "UVP/");
/* harmony import */ var _modal_oferta_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal-oferta.page */ "cmSm");







let ModalOfertaPageModule = class ModalOfertaPageModule {
};
ModalOfertaPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _modal_oferta_routing_module__WEBPACK_IMPORTED_MODULE_5__["ModalOfertaPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_modal_oferta_page__WEBPACK_IMPORTED_MODULE_6__["ModalOfertaPage"]]
    })
], ModalOfertaPageModule);



/***/ })

}]);
//# sourceMappingURL=pages-modal-oferta-modal-oferta-module.js.map