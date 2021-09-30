import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, IonInput, ModalController, ToastController } from '@ionic/angular';
import { Articulo } from 'src/app/classes/articulo';
import { Oferta } from 'src/app/classes/oferta';
import db from '../../../environments/environment';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  // Total de la venta del día
  venta: number = 0;
  total: number = 0;
  cant: number = 0;
  uidAsador: string = "";

  // Usuario y fecha actual
  user: firebase.default.User;
  date = new Date().toLocaleDateString();

  // Array con la venta extra del día 
  ofertas: Oferta[];
  articulos: Articulo[];

  // Cantidad cualquiera que el usuario marca
  @ViewChild('cant') cantInput: IonInput;

  constructor(public modalController: ModalController, private toastCtrl: ToastController, private fireAuth: AngularFireAuth, private alertCtrl: AlertController){

  }

  ngOnInit() {

    // Inicializamos los arrays
    this.ofertas = [];
    this.articulos = [];

    this.fireAuth.user.subscribe(data => {

      // Datos del usuario actual
      this.user = data;
      let uid = this.user.uid;

      this.uidAsador = uid;

      // Añadimos los datos a nuestro array de artículos para trabajar con ellos
      db.collection('articulos').where("uidAsador", "==", uid).onSnapshot( snap => {

        // Vacíamos el array para que no se dupliquen los datos
        this.articulos = [];

        snap.forEach( snapHijo => {
          // Obtenemos los datos del artículo
          let uid = snapHijo.id;
          let nombre = snapHijo.data().nombre;
          let ingredientes = snapHijo.data().ingredientes;
          let alergenos = snapHijo.data().alergenos;
          let precio = snapHijo.data().precio;
          let uidAsador = snapHijo.data().uidAsador;

          // Creamos un nuevo objeto artículo
          let articulo = new Articulo(uid, nombre, ingredientes, alergenos, precio, uidAsador);

          // Lo introducimos en nuestro array
          this.articulos.push(articulo);

        });
      });

      // Añadimos los datos a nuestro array de ofertas para trabajar con ellos
      db.collection('ofertas').where("uidAsador", "==", uid).onSnapshot( snap => {

        // Vacíamos el array para que no se dupliquen los datos
        this.ofertas = [];

        snap.forEach( snapHijo => {

          // Obtenemos los datos de la oferta
          let uid = snapHijo.id;
          let nombre = snapHijo.data().nombre;
          let articulos = snapHijo.data().articulos;
          let precio = snapHijo.data().precio;
          let uidAsador = snapHijo.data().uidAsador;

          // Creamos un nuevo objeto oferta
          let oferta = new Oferta(uid, nombre, articulos, precio, uidAsador);

          // Lo introducimos en nuestro array
          this.ofertas.push(oferta);

        });
      });

      // id del documento en el que guardaremos la venta del día
      let id = "";

      // Obtenemos el id del doc en el que guardamos la venta de hoy
      db.collection('venta').where('uidAsador', '==', uid).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( (snap) => {
      snap.forEach(doc => {
        id = doc.id;
        this.total = doc.data().total;
      })
      }).then(() => {

        if(id == ""){
          // Creamos el documento con la fecha actual, precio 0 y el uid del asador
          db.collection('venta').add({
            fecha: this.date,
            total: 0,
            uidAsador: uid
          });
        }

        // Si el documento ya se creó podemos obtener la venta del día
        else{
          db.collection('venta').doc(id).get().then( (doc) => {
            this.venta = doc.data().total
          })
        }

      });
    });
  }

  // Añadir precio
  add(precio: string){
    
    // id del doc
    let uid: string = "";

    // Total venta
    let total: number = 0;

    // Obtenemos el id del doc en el que guardamos la venta de hoy
    db.collection('venta').where('uidAsador', '==', this.uidAsador).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( (snap) => {
      snap.forEach(doc => {
        uid = doc.id;
        total = doc.data().total;
      })
    }).then(() => {

      // Sumamos al total el precio que se nos haya pasado y actualizamos el documento
      total += parseFloat(precio);

      // Luego actualizamos el total
      db.collection('venta').doc(uid).update({
        total: total
      });

      // Cuando hayamos actualizado el total borramos el input de cantidad extra si hay algo en él
      if(this.cantInput.value != ''){
       this.cantInput.value = '';
      }

      // Mostramos la venta 
      this.venta = total;

      // Mensaje para informar al usuario
      this.presentToast("Se ha añadido la venta");

    });
  }

  // Añadir otra cantidad
  addAnotherAmount(precio: string){
    // Comprobamos que se haya introducido un número en el input
    if(precio != '' && parseFloat(precio)){
      // Llamamos al método add para que añada la cantidad marcada
      this.add(precio);

      // Borramos el valor del input
      this.cantInput.value = '';
    }
    else{
      // Pedimos al usuario que rellene el input
      this.presentToast('Debes introducir una cantidad');

      // Borramos el valor del input
      this.cantInput.value = '';
    }
  }

  // Desmarcar precio
  delete(precio: string){
    // id del doc
    let uid: string = "";

    // Total venta
    let total: number = 0;

    // Obtenemos el id del doc en el que guardamos la venta de hoy
    db.collection('venta').where('uidAsador', '==', this.uidAsador).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( (snap) => {
      snap.forEach(doc => {
        uid = doc.id;
        total = doc.data().total;
      })
    }).then(() => {
      // Sumamos al total el precio que se nos haya pasado y actualizamos el documento
      total -= parseFloat(precio);

      if(uid == ""){
        // Creamos el documento y le metemos el precio que se nos ha pasado
        db.collection('venta').add({
          fecha: this.date,
          total: parseFloat(precio)
        });

      }
      else{
        // Luego actualizamos el total
        db.collection('venta').doc(uid).update({
          total: total
        });

        // Mostramos la venta 
        this.venta = total;

        // Mensaje para informar al usuario
        this.presentToast("Se ha desmarcado la venta");
      }     

    });
  }

  // Desmarcar otra cantidad
  deleteAnotherAmount(precio: string){
    // Comprobamos que se haya introducido un número en el input
    if(precio != '' && parseFloat(precio)){
      // Llamamos al método add para que añada la cantidad marcada
      this.delete(precio);

      // Borramos el valor del input
      this.cantInput.value = '';
    }
    else{
      // Pedimos al usuario que rellene el input
      this.presentToast('Debes introducir una cantidad');

      // Borramos el valor del input
      this.cantInput.value = '';
    }
  }

  // Resetear venta
  resetVenta(){
    // Ponemos el contador de la venta a 0, pero primero pedimos confirmación
    // Presentamos el alert para preguntar al usuario
    this.alertCtrl.create({
      header: "Reinicio de Venta",
      message: "¿Seguro que quieres reiniciar la venta? El total se eliminará",
      buttons: [
        {
         text: 'Reiniciar',
         handler: () => {      

          // Vamos a actualizar el total del día, poniéndolo a 0
          // id del doc
          let uid: string = "";

          // Total venta
          let total: number = 0;

          // Obtenemos el id del doc en el que guardamos la venta de hoy
          db.collection('venta').where('uidAsador', '==', this.uidAsador).orderBy('fecha').startAt(this.date).endAt(this.date+'\uf8ff').get().then( (snap) => {
            snap.forEach(doc => {
              uid = doc.id;
              total = doc.data().total;
            })
          }).then(() => {

            // Sumamos al total el precio que se nos haya pasado y actualizamos el documento
            total = 0;

            // Luego actualizamos el total
            db.collection('venta').doc(uid).update({
              total: total
            });

            // Mostramos la venta 
            this.venta = total;

            // Mensaje para informar al usuario
            this.presentToast("Se ha reiniciado la venta");

          });
        } 
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]

    }).then( obj => {
      obj.present();
    })

  }

  // Toast message
  presentToast(message: string){
    this.toastCtrl.create({
      animated: true,
      message: message,
      duration: 2000,
      translucent: true,
    }).then((obj) => {
      obj.present();
    })
    
  }

  


}
