(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ofertas-articulos-ofertas-articulos-module"],{

/***/ "0Ozq":
/*!*******************************************************************!*\
  !*** ./src/app/pages/ofertas-articulos/ofertas-articulos.page.ts ***!
  \*******************************************************************/
/*! exports provided: OfertasArticulosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfertasArticulosPage", function() { return OfertasArticulosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_ofertas_articulos_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./ofertas-articulos.page.html */ "XY8h");
/* harmony import */ var _ofertas_articulos_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ofertas-articulos.page.scss */ "K6PD");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _modal_articulo_modal_articulo_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modal-articulo/modal-articulo.page */ "5NP5");
/* harmony import */ var _modal_oferta_modal_oferta_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modal-oferta/modal-oferta.page */ "cmSm");







let OfertasArticulosPage = class OfertasArticulosPage {
    constructor(modalController) {
        this.modalController = modalController;
    }
    ngOnInit() {
    }
    presentModalOferta() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _modal_oferta_modal_oferta_page__WEBPACK_IMPORTED_MODULE_6__["ModalOfertaPage"]
            });
            return yield modal.present();
        });
    }
    presentModalArticulo() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _modal_articulo_modal_articulo_page__WEBPACK_IMPORTED_MODULE_5__["ModalArticuloPage"]
            });
            return yield modal.present();
        });
    }
};
OfertasArticulosPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
OfertasArticulosPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-ofertas-articulos',
        template: _raw_loader_ofertas_articulos_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_ofertas_articulos_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], OfertasArticulosPage);



/***/ }),

/***/ "K6PD":
/*!*********************************************************************!*\
  !*** ./src/app/pages/ofertas-articulos/ofertas-articulos.page.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvZmVydGFzLWFydGljdWxvcy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "XY8h":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/ofertas-articulos/ofertas-articulos.page.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Ofertas & Artículos</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-title>Lista de Ofertas</ion-card-title>\n  </ion-card>\n\n  <ion-button (click)=\"presentModalOferta()\" expand=\"block\">Añadir Oferta</ion-button>\n\n  <ion-card>\n    <ion-card-title>Lista de Artículos</ion-card-title>\n  </ion-card>\n\n  <ion-button (click)=\"presentModalArticulo()\" expand=\"block\">Añadir Artículo</ion-button>\n\n</ion-content>");

/***/ }),

/***/ "evj9":
/*!*********************************************************************!*\
  !*** ./src/app/pages/ofertas-articulos/ofertas-articulos.module.ts ***!
  \*********************************************************************/
/*! exports provided: OfertasArticulosPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfertasArticulosPageModule", function() { return OfertasArticulosPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ofertas_articulos_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ofertas-articulos-routing.module */ "v7HU");
/* harmony import */ var _ofertas_articulos_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ofertas-articulos.page */ "0Ozq");







let OfertasArticulosPageModule = class OfertasArticulosPageModule {
};
OfertasArticulosPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ofertas_articulos_routing_module__WEBPACK_IMPORTED_MODULE_5__["OfertasArticulosPageRoutingModule"]
        ],
        declarations: [_ofertas_articulos_page__WEBPACK_IMPORTED_MODULE_6__["OfertasArticulosPage"]]
    })
], OfertasArticulosPageModule);



/***/ }),

/***/ "v7HU":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/ofertas-articulos/ofertas-articulos-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: OfertasArticulosPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfertasArticulosPageRoutingModule", function() { return OfertasArticulosPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ofertas_articulos_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ofertas-articulos.page */ "0Ozq");




const routes = [
    {
        path: '',
        component: _ofertas_articulos_page__WEBPACK_IMPORTED_MODULE_3__["OfertasArticulosPage"]
    }
];
let OfertasArticulosPageRoutingModule = class OfertasArticulosPageRoutingModule {
};
OfertasArticulosPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], OfertasArticulosPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=ofertas-articulos-ofertas-articulos-module.js.map