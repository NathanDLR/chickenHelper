(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "+1k8":
/*!***********************************************************!*\
  !*** ./src/app/pages/modal-oferta/modal-oferta.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC1vZmVydGEucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "35L6":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/modal-oferta/modal-oferta.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Nueva Oferta</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div>\n    <form [formGroup]=\"ofertaForm\">\n      \n      <ion-item>\n        <ion-label>Nombre de la Oferta</ion-label>\n        <ion-input #name placeholder=\"Nombre\" formControlName=\"name\" [ngClass]=\"{\n          'invalidInput': ofertaForm.controls.name.invalid && ofertaForm.controls.name.touched,\n          'validInput': ofertaForm.controls.name.valid && ofertaForm.controls.name.touched\n        }\">\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Artículos que componen la Oferta</ion-label>\n        <!--\n          Input o dropdownlist?\n        -->\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Precio de la Oferta</ion-label>\n        <ion-input #price placeholder=\"Precio\" formControlName=\"price\" [ngClass]=\"{\n          'invalidInput': ofertaForm.controls.price.invalid && ofertaForm.controls.price.touched,\n          'validInput': ofertaForm.controls.price.valid && ofertaForm.controls.price.touched  \n          }\">\n        </ion-input>\n      </ion-item>\n\n    </form>\n\n    <ion-button expand=\"block\">\n      Añadir Oferta\n    </ion-button>\n\n    <ion-button color=\"danger\" (click)=\"dismissModal()\" expand=\"block\">\n      Salir\n    </ion-button>\n\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "5NP5":
/*!*************************************************************!*\
  !*** ./src/app/pages/modal-articulo/modal-articulo.page.ts ***!
  \*************************************************************/
/*! exports provided: ModalArticuloPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalArticuloPage", function() { return ModalArticuloPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_modal_articulo_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./modal-articulo.page.html */ "8lVa");
/* harmony import */ var _modal_articulo_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-articulo.page.scss */ "UTr7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");








let ModalArticuloPage = class ModalArticuloPage {
    constructor(alertController, modalController, fireAuth, toastCtrl) {
        this.alertController = alertController;
        this.modalController = modalController;
        this.fireAuth = fireAuth;
        this.toastCtrl = toastCtrl;
        // Datos del usuario actual
        fireAuth.user.subscribe((data => {
            this.user = data;
        }));
    }
    ngOnInit() {
        // Formulario en código
        this.articuloForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ]),
            ingredients: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ]),
            alergies: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ]),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ])
        });
    }
    // Validación del formulario
    validate(name, ingredients, alergies, price) {
        let ok = true;
        if (name == "" || ingredients == "" || alergies == "" || price == "")
            ok = false;
        try {
            parseInt(price);
        }
        catch (error) {
            ok = false;
        }
        return ok;
    }
    // Añadir artículo
    addArticulo(name, ingredients, alergies, price) {
        // console.log('Nombre:', name, 'Ingredientes:', ingredients, 'Alérgenos:', alergies, 'Precio:', price);
        // Validación de los inputs
        let ok = this.validate(name, ingredients, alergies, price);
        if (ok) {
            // Obtenemos el uid para guardarlo en la colección, así después podremos obtener todos los artículos por el uid
            let uid = this.user.uid;
            // console.log(uid)
            // Añadimos el artículo a la colección de artículos
            let collection = 'articulos';
            _environments_environment__WEBPACK_IMPORTED_MODULE_6__["default"].collection(collection).add({
                uid: uid,
                nombre: name,
                ingredientes: ingredients,
                alergenos: alergies,
                precio: parseInt(price)
            });
            // Limpiamos los inputs
            this.clearInputs();
            // Mostramos un mensaje para informar al usuario
            this.presentToast();
        }
        else {
            // Pedimos al usuario que revise los inputs
        }
    }
    dismissModal() {
        this.modalController.dismiss();
    }
    // Limpiar los textboxes
    clearInputs() {
        this.nameInput.value = "";
        this.ingredientsInput.value = "";
        this.alergiesInput.value = "";
        this.priceInput.value = "";
    }
    // Toast message
    presentToast() {
        this.toastCtrl.create({
            animated: true,
            message: 'Artículo añadido correctamente a la Base de Datos',
            duration: 2000,
            translucent: true,
        }).then((obj) => {
            obj.present();
        });
    }
};
ModalArticuloPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__["AngularFireAuth"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] }
];
ModalArticuloPage.propDecorators = {
    nameInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['name',] }],
    ingredientsInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['ingredients',] }],
    alergiesInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['alergies',] }],
    priceInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['price',] }]
};
ModalArticuloPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-modal-articulo',
        template: _raw_loader_modal_articulo_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_modal_articulo_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ModalArticuloPage);



/***/ }),

/***/ "74mu":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/theme-ff3fc52f.js ***!
  \*************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
const hostContext = (selector, el) => {
  return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
const createColorClasses = (color, cssClassMap) => {
  return (typeof color === 'string' && color.length > 0) ? Object.assign({ 'ion-color': true, [`ion-color-${color}`]: true }, cssClassMap) : cssClassMap;
};
const getClassList = (classes) => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter(c => c != null)
      .map(c => c.trim())
      .filter(c => c !== '');
  }
  return [];
};
const getClassMap = (classes) => {
  const map = {};
  getClassList(classes).forEach(c => map[c] = true);
  return map;
};
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
const openURL = async (url, ev, direction, animation) => {
  if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
    const router = document.querySelector('ion-router');
    if (router) {
      if (ev != null) {
        ev.preventDefault();
      }
      return router.push(url, direction, animation);
    }
  }
  return false;
};




/***/ }),

/***/ "8lVa":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/modal-articulo/modal-articulo.page.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Nuevo Artículo</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <div>\r\n    <form [formGroup]=\"articuloForm\">\r\n\r\n      <ion-item>\r\n        <ion-label>Nombre del Artículo</ion-label>\r\n        <ion-input #name placeholder=\"Nombre\" formControlName=\"name\" [ngClass]=\"{\r\n          'invalidInput': articuloForm.controls.name.invalid && articuloForm.controls.name.touched,\r\n          'validInput': articuloForm.controls.name.valid && articuloForm.controls.name.touched\r\n        }\">\r\n        </ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label>Ingredientes del Artículo</ion-label>\r\n        <ion-input #ingredients placeholder=\"Ingredientes\" formControlName=\"ingredients\" [ngClass]=\"{\r\n          'invalidInput': articuloForm.controls.ingredients.invalid && articuloForm.controls.ingredients.touched,\r\n          'validInput': articuloForm.controls.ingredients.valid && articuloForm.controls.ingredients.touched\r\n        }\">\r\n        </ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label>Información de Alérgenos</ion-label>\r\n        <ion-input #alergies placeholder=\"Alérgenos\" formControlName=\"alergies\" [ngClass]=\"{\r\n          'invalidInput': articuloForm.controls.alergies.invalid && articuloForm.controls.alergies.touched,\r\n          'validInput': articuloForm.controls.alergies.valid && articuloForm.controls.alergies.touched\r\n          }\">\r\n        </ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label>Precio del artículo</ion-label>\r\n        <ion-input #price placeholder=\"Precio\" formControlName=\"price\" [ngClass] = \"{\r\n          'invalidInput': articuloForm.controls.price.invalid && articuloForm.controls.price.touched,\r\n          'validInput': articuloForm.controls.price.valid && articuloForm.controls.price.touched\r\n        }\">\r\n        </ion-input>\r\n      </ion-item>\r\n\r\n    </form>\r\n\r\n    <ion-button expand=\"block\"  (click)=\"addArticulo(name.value, ingredients.value, alergies.value, price.value)\">\r\n      Añadir Artículo\r\n    </ion-button>\r\n\r\n    <ion-button color=\"danger\" (click)=\"dismissModal()\" expand=\"block\">\r\n      Salir\r\n    </ion-button>\r\n\r\n  </div>\r\n</ion-content>");

/***/ }),

/***/ "EQv0":
/*!***********************************************!*\
  !*** ./src/app/pages/pedidos/pedidos.page.ts ***!
  \***********************************************/
/*! exports provided: PedidosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PedidosPage", function() { return PedidosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pedidos_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pedidos.page.html */ "aLly");
/* harmony import */ var _pedidos_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pedidos.page.scss */ "UaSF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let PedidosPage = class PedidosPage {
    constructor() { }
    ngOnInit() {
    }
};
PedidosPage.ctorParameters = () => [];
PedidosPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pedidos',
        template: _raw_loader_pedidos_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pedidos_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PedidosPage);



/***/ }),

/***/ "JbSX":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/button-active-4927a4c1.js ***!
  \*********************************************************************/
/*! exports provided: c */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createButtonActiveGesture; });
/* harmony import */ var _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-7a8b7a1c.js */ "wEJo");
/* harmony import */ var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./haptic-27b3f981.js */ "qULd");
/* harmony import */ var _index_f49d994d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-f49d994d.js */ "iWo5");




const createButtonActiveGesture = (el, isButton) => {
  let currentTouchedButton;
  let initialTouchedButton;
  const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
    if (typeof document === 'undefined') {
      return;
    }
    const target = document.elementFromPoint(x, y);
    if (!target || !isButton(target)) {
      clearActiveButton();
      return;
    }
    if (target !== currentTouchedButton) {
      clearActiveButton();
      setActiveButton(target, hapticFeedbackFn);
    }
  };
  const setActiveButton = (button, hapticFeedbackFn) => {
    currentTouchedButton = button;
    if (!initialTouchedButton) {
      initialTouchedButton = currentTouchedButton;
    }
    const buttonToModify = currentTouchedButton;
    Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.add('ion-activated'));
    hapticFeedbackFn();
  };
  const clearActiveButton = (dispatchClick = false) => {
    if (!currentTouchedButton) {
      return;
    }
    const buttonToModify = currentTouchedButton;
    Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.remove('ion-activated'));
    /**
     * Clicking on one button, but releasing on another button
     * does not dispatch a click event in browsers, so we
     * need to do it manually here. Some browsers will
     * dispatch a click if clicking on one button, dragging over
     * another button, and releasing on the original button. In that
     * case, we need to make sure we do not cause a double click there.
     */
    if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
      currentTouchedButton.click();
    }
    currentTouchedButton = undefined;
  };
  return Object(_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_2__["createGesture"])({
    el,
    gestureName: 'buttonActiveDrag',
    threshold: 0,
    onStart: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__["a"]),
    onMove: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__["b"]),
    onEnd: () => {
      clearActiveButton(true);
      Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_1__["h"])();
      initialTouchedButton = undefined;
    }
  });
};




/***/ }),

/***/ "UTr7":
/*!***************************************************************!*\
  !*** ./src/app/pages/modal-articulo/modal-articulo.page.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC1hcnRpY3Vsby5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "UaSF":
/*!*************************************************!*\
  !*** ./src/app/pages/pedidos/pedidos.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwZWRpZG9zLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "aLly":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/pedidos/pedidos.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Pedidos</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-title>Lista de Pedidos</ion-card-title>\n  </ion-card>\n</ion-content>\n");

/***/ }),

/***/ "acej":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-4392cd63.js ***!
  \**************************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return detachComponent; });
/* harmony import */ var _helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers-dd7e4b7b.js */ "1vRN");


const attachComponent = async (delegate, container, component, cssClasses, componentProps) => {
  if (delegate) {
    return delegate.attachViewToDom(container, component, componentProps, cssClasses);
  }
  if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
    throw new Error('framework delegate is missing');
  }
  const el = (typeof component === 'string')
    ? container.ownerDocument && container.ownerDocument.createElement(component)
    : component;
  if (cssClasses) {
    cssClasses.forEach(c => el.classList.add(c));
  }
  if (componentProps) {
    Object.assign(el, componentProps);
  }
  container.appendChild(el);
  await new Promise(resolve => Object(_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_0__["c"])(el, resolve));
  return el;
};
const detachComponent = (delegate, element) => {
  if (element) {
    if (delegate) {
      const container = element.parentElement;
      return delegate.removeViewFromDom(container, element);
    }
    element.remove();
  }
  return Promise.resolve();
};




/***/ }),

/***/ "cmSm":
/*!*********************************************************!*\
  !*** ./src/app/pages/modal-oferta/modal-oferta.page.ts ***!
  \*********************************************************/
/*! exports provided: ModalOfertaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalOfertaPage", function() { return ModalOfertaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_modal_oferta_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./modal-oferta.page.html */ "35L6");
/* harmony import */ var _modal_oferta_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-oferta.page.scss */ "+1k8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");






let ModalOfertaPage = class ModalOfertaPage {
    constructor(alertController, modalController) {
        this.alertController = alertController;
        this.modalController = modalController;
    }
    ngOnInit() {
        // Formulario en código
        this.ofertaForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ]),
            articles: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ]),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ])
        });
    }
    // Validación del formulario
    validate(name, articles, price) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        });
    }
    // Dismiss modal
    dismissModal() {
        this.modalController.dismiss();
    }
};
ModalOfertaPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] }
];
ModalOfertaPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-modal-oferta',
        template: _raw_loader_modal_oferta_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_modal_oferta_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ModalOfertaPage);



/***/ }),

/***/ "h3R7":
/*!***********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/spinner-configs-cd7845af.js ***!
  \***********************************************************************/
/*! exports provided: S */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return SPINNERS; });
const spinners = {
  'bubbles': {
    dur: 1000,
    circles: 9,
    fn: (dur, index, total) => {
      const animationDelay = `${(dur * index / total) - dur}ms`;
      const angle = 2 * Math.PI * index / total;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circles': {
    dur: 1000,
    circles: 8,
    fn: (dur, index, total) => {
      const step = index / total;
      const animationDelay = `${(dur * step) - dur}ms`;
      const angle = 2 * Math.PI * step;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circular': {
    dur: 1400,
    elmDuration: true,
    circles: 1,
    fn: () => {
      return {
        r: 20,
        cx: 48,
        cy: 48,
        fill: 'none',
        viewBox: '24 24 48 48',
        transform: 'translate(0,0)',
        style: {}
      };
    }
  },
  'crescent': {
    dur: 750,
    circles: 1,
    fn: () => {
      return {
        r: 26,
        style: {}
      };
    }
  },
  'dots': {
    dur: 750,
    circles: 3,
    fn: (_, index) => {
      const animationDelay = -(110 * index) + 'ms';
      return {
        r: 6,
        style: {
          'left': `${9 - (9 * index)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 17,
        y2: 29,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines-small': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 12,
        y2: 20,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  }
};
const SPINNERS = spinners;




/***/ }),

/***/ "qULd":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/haptic-27b3f981.js ***!
  \**************************************************************/
/*! exports provided: a, b, c, d, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hapticImpact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelectionEnd; });
const HapticEngine = {
  getEngine() {
    const win = window;
    return (win.TapticEngine) || (win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics);
  },
  available() {
    return !!this.getEngine();
  },
  isCordova() {
    return !!window.TapticEngine;
  },
  isCapacitor() {
    const win = window;
    return !!win.Capacitor;
  },
  impact(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.impact({ style });
  },
  notification(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.notification({ style });
  },
  selection() {
    this.impact({ style: 'light' });
  },
  selectionStart() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionStart();
    }
    else {
      engine.gestureSelectionStart();
    }
  },
  selectionChanged() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionChanged();
    }
    else {
      engine.gestureSelectionChanged();
    }
  },
  selectionEnd() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionEnd();
    }
    else {
      engine.gestureSelectionEnd();
    }
  }
};
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
const hapticSelection = () => {
  HapticEngine.selection();
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
const hapticSelectionStart = () => {
  HapticEngine.selectionStart();
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
const hapticSelectionChanged = () => {
  HapticEngine.selectionChanged();
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
const hapticSelectionEnd = () => {
  HapticEngine.selectionEnd();
};
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
const hapticImpact = (options) => {
  HapticEngine.impact(options);
};




/***/ }),

/***/ "usY9":
/*!*********************************************************!*\
  !*** ./src/app/pages/pedidos/pedidos-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: PedidosPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PedidosPageRoutingModule", function() { return PedidosPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pedidos_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pedidos.page */ "EQv0");




const routes = [
    {
        path: '',
        component: _pedidos_page__WEBPACK_IMPORTED_MODULE_3__["PedidosPage"]
    }
];
let PedidosPageRoutingModule = class PedidosPageRoutingModule {
};
PedidosPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PedidosPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=common.js.map