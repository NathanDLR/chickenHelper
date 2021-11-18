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

  constructor(private fireAuth: AngularFireAuth, private auth: AuthService, private router: Router, private toast: ToastController) { }

  ngOnInit(){

    // Obtenemos los datos del usuario actual
    this.fireAuth.user.subscribe(data => {

      this.user = data;

      db.collection('users').doc(this.user.uid).onSnapshot(doc => {
        this.nameInput.value = doc.data().name;
        this.addressInput.value = doc.data().address;
        this.tlfInput.value = doc.data().tlf;
        this.scheduleInput.value = doc.data().schedule;
      });

    });

  }

  // Update data
  updateData(name: string, address: string, addressUrl: string, tlf: string, schedule: string){

    // Validamos los datos que se nos pasan
    let ok = this.validate(name, address, tlf, schedule);

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

  // Validación de los datos
  validate(name: string, address: string, tlf: string, schedule: string): boolean{
    let ok = true;

    // Comprobamos que todos los campos estén rellenos
    if(name == "" || address == "" || tlf == "" || schedule == ""){
      this.presentToast("Debes rellenar todos los campos");
      ok = false
    }

    // Comprobamos que el número de tlf sea de 9 dígitos
    if(ok && tlf.length != 9){
      this.presentToast("El número de teléfono debe ser de 9 dígitos");
      ok = false;
    }

    return ok;
  }

  // Cerrar sesión
  logOut(){
    // Cerramos la sesión 
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
