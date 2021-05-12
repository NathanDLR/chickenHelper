(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-forgot-pwd-forgot-pwd-module"],{

/***/ "+Lv8":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/forgot-pwd/forgot-pwd.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Recupera tu contraseña</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div>\n    <form [formGroup]=\"pwdForm\" >\n\n      <ion-item>\n        <ion-label>Email</ion-label>\n        <ion-input type=\"text\" #email placeholder=\"Escribe tu email\" formControlName=\"email\"></ion-input>\n      </ion-item>\n\n    </form>\n  </div>\n\n  <ion-row>\n    <ion-col>\n      <ion-button (click)=\"resetPwd(email.value)\" expand=\"block\">\n        Restablecer contraseña\n      </ion-button>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <ion-button routerLink=\"/home\" expand=\"block\">Volver al inicio</ion-button>\n    </ion-col>\n  </ion-row>\n\n</ion-content>\n");

/***/ }),

/***/ "7jQT":
/*!***************************************************************!*\
  !*** ./src/app/pages/forgot-pwd/forgot-pwd-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: ForgotPwdPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPwdPageRoutingModule", function() { return ForgotPwdPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _forgot_pwd_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgot-pwd.page */ "KVF0");




const routes = [
    {
        path: '',
        component: _forgot_pwd_page__WEBPACK_IMPORTED_MODULE_3__["ForgotPwdPage"]
    }
];
let ForgotPwdPageRoutingModule = class ForgotPwdPageRoutingModule {
};
ForgotPwdPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ForgotPwdPageRoutingModule);



/***/ }),

/***/ "KVF0":
/*!*****************************************************!*\
  !*** ./src/app/pages/forgot-pwd/forgot-pwd.page.ts ***!
  \*****************************************************/
/*! exports provided: ForgotPwdPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPwdPage", function() { return ForgotPwdPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_forgot_pwd_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./forgot-pwd.page.html */ "+Lv8");
/* harmony import */ var _forgot_pwd_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forgot-pwd.page.scss */ "Yqv9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");







let ForgotPwdPage = class ForgotPwdPage {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    ngOnInit() {
        // Formulario para recuperar la contraseña en código
        this.pwdForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ])
        });
    }
    // Restablecer la contraseña
    resetPwd(email) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // 
            try {
                yield this.auth.resetPWd(email);
                this.router.navigate(['login']);
            }
            catch (error) {
                console.log('Error: ', error);
            }
        });
    }
};
ForgotPwdPage.ctorParameters = () => [
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
ForgotPwdPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-forgot-pwd',
        template: _raw_loader_forgot_pwd_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_forgot_pwd_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ForgotPwdPage);



/***/ }),

/***/ "Yqv9":
/*!*******************************************************!*\
  !*** ./src/app/pages/forgot-pwd/forgot-pwd.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3Jnb3QtcHdkLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "hSO8":
/*!*******************************************************!*\
  !*** ./src/app/pages/forgot-pwd/forgot-pwd.module.ts ***!
  \*******************************************************/
/*! exports provided: ForgotPwdPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPwdPageModule", function() { return ForgotPwdPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _forgot_pwd_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forgot-pwd-routing.module */ "7jQT");
/* harmony import */ var _forgot_pwd_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forgot-pwd.page */ "KVF0");







let ForgotPwdPageModule = class ForgotPwdPageModule {
};
ForgotPwdPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _forgot_pwd_routing_module__WEBPACK_IMPORTED_MODULE_5__["ForgotPwdPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_forgot_pwd_page__WEBPACK_IMPORTED_MODULE_6__["ForgotPwdPage"]]
    })
], ForgotPwdPageModule);



/***/ })

}]);
//# sourceMappingURL=pages-forgot-pwd-forgot-pwd-module.js.map