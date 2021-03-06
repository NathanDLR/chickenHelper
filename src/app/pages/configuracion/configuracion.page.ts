import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import db from '../../../environments/environment';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  // Usuario actual y datos
  user: firebase.default.User;

  @ViewChild('name') nameInput: IonInput;
  @ViewChild('address') addressInput: IonInput;
  @ViewChild('tlf') tlfInput: IonInput;
  @ViewChild('schedule') scheduleInput: IonInput;
  @ViewChild('addressUrl') adressUrlInput: IonInput;

  constructor(private fireAuth: AngularFireAuth, private auth: AuthService, private router: Router, private toast: ToastController) { }

  ngOnInit(){

    // Obtenemos los datos del usuario actual
    this.fireAuth.user.subscribe(data => {

      this.user = data;

      db.collection('users').doc(this.user.uid).onSnapshot(doc => {
        this.nameInput.value = doc.data().name;
        this.addressInput.value = doc.data().address;
        this.adressUrlInput.value = doc.data().addressUrl;
        this.tlfInput.value = doc.data().tlf;
        this.scheduleInput.value = doc.data().schedule;
      });

    });

  }

  // Update data
  updateData(name: string, address: string, addressUrl: string, tlf: string, schedule: string){

    // Validamos los datos que se nos pasan
    let ok = this.validate(name, address, addressUrl, tlf, schedule);

    if(ok){
      // Si los datos son correctos los metemos en la bd
      db.collection('users').doc(this.user.uid).update({
        name: name,
        address: address,
        addressUrl: addressUrl,
        tlf: tlf,
        schedule: schedule
      });

      // Mostramos un mensaje para avisar al usuario
      this.presentToast("Los datos se han actualizado correctamente");

    }
    
  }

  // Validaci??n de los datos
  validate(name: string, address: string, addressUrl: string, tlf: string, schedule: string): boolean{
    let ok = true;

    // Comprobamos que todos los campos est??n rellenos
    if(name == "" || address == "" || addressUrl == "" || tlf == "" || schedule == ""){
      this.presentToast("Debes rellenar todos los campos");
      ok = false
    }

    // Comprobamos que el n??mero de tlf sea de 9 d??gitos
    if(ok && tlf.length != 9){
      this.presentToast("El n??mero de tel??fono debe ser de 9 d??gitos");
      ok = false;
    }

    return ok;
  }

  // Cerrar sesi??n
  logOut(){
    // Cerramos la sesi??n 
    this.auth.logout();
  }

  // Present toast
  async presentToast(msg: string){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });

    await toast.present();

  }

}
