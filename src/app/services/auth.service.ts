import { Injectable, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

import db from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$:Observable<any>;

  constructor(public fireAuth: AngularFireAuth, private afs:AngularFirestore, private alert: AlertController, private router: Router) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
  }

  // Enviar email de verificación
  async sendVerificationEmail(): Promise<void>{
    try{
      // Obtenemos el usuario actual y le enviamos el correo
      return (await this.fireAuth.currentUser).sendEmailVerification();
    }
    catch(error){
      console.log('Error: ', error);
    }
  }

  // Comprobar que el email ha sido verificado
  isEmailVerified(user: User): Boolean{
    return user.emailVerified === true ? true : false
  }

  // Resetear la contraseña
  async resetPWd(email: string): Promise<void>{
    try{
      return this.fireAuth.sendPasswordResetEmail(email);
    }
    catch(error){
      console.log('Error: ', error)
    }
  }

  // Login 
  async login(email: string, password: string): Promise<User>{
    try{
      const {user} = await this.fireAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }
    catch(error){
      // Comprobamos los posibles errores
      console.log('Error code: ', error.code);

      let errorCode = error.code;

      this.getError(errorCode)

    }
  }

  // Login 
  async loginClient(email: string, password: string): Promise<User>{
    try{
      const {user} = await this.fireAuth.signInWithEmailAndPassword(email, password);
      this.updateUserDataClient(user);
      return user;
    }
    catch(error){
      // Comprobamos los posibles errores
      console.log('Error code: ', error.code);

      let errorCode = error.code;

      this.getError(errorCode)

    }
  }

  // Registro con google
  async loginGoogle(): Promise<User>{
    try{
      const {user} = await this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider);
      this.updateUserData(user);
      return user;
    }
    catch(error){
      console.log('Error: ', error)
    }
  }

  async loginGoogleClient(): Promise<User>{
    try{
      const {user} = await this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider);
      this.updateUserDataClient(user);
      return user;
    }
    catch(error){
      console.log('Error: ', error)
    }
  }


  // Registro
  async register(email: string, password:string): Promise<User>{
    try{
      const {user} = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      this.insertData(user);

      // Enviamos un email de verificación cuando el usuario se registre
      await this.sendVerificationEmail();

      return user;
    }
    catch(error){
      // Comprobamos los posibles errores
      console.log('Error code: ', error.code)

      let errorCode = error.code 

      this.getError(errorCode);
    }
  }

  // Registro clientes
  async registerClient(email: string, password:string): Promise<User>{
    try{
      const {user} = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      this.insertDataClient(user);

      // Enviamos un email de verificación cuando el usuario se registre
      await this.sendVerificationEmail();

      return user;
    }
    catch(error){
      // Comprobamos los posibles errores
      console.log('Error code: ', error.code)

      let errorCode = error.code 

      this.getError(errorCode);
    }
  }

  // Log out 
  async logout(): Promise<void>{
    try{
      await this.fireAuth.signOut();
      // console.log("Se ha cerrado la sesión");
      this.router.navigate(['home']);
    }
    catch(error){
      console.log('Error: ', error);
    }
  }

  // Update Data
  private updateUserData(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
    db.collection('users').doc(user.uid).get().then(doc => {
      let tipo: number;
      
      if(doc.exists == false) tipo = 0;
      else tipo = doc.data().tipo;

      const data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName, 
        tipo: tipo
      };
  
      return userRef.set(data, {merge: true});
    });
  }

  // Update Data Client
  private updateUserDataClient(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
    db.collection('users').doc(user.uid).get().then(doc => {
      let tipo: number;
      
      if(doc.exists == false) tipo = 1;
      else tipo = doc.data().tipo;

      const data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName, 
        tipo: tipo
      };
  
      return userRef.set(data, {merge: true});
    });
  }

  // Insert data empresa
  private insertData(user: User){
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

    userRef.set({
      tipo: 0
    })
  }

  // Insert data clientes
  private insertDataClient(user: User){
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

    userRef.set({
      tipo: 1
    })
  }

  // Control de errores
  getError(errorCode: String){
    // Correo no válido 
    if(errorCode == 'auth/invalid-email') this.presentRegisterAlert(1);

    // Contraseña incorrecta
    if(errorCode == 'auth/wrong-password') this.presentRegisterAlert(2);

    // Correo en uso
    if(errorCode == 'auth/email-already-in-use') this.presentRegisterAlert(3);

    // Usuario no encontrado
    if(errorCode == 'auth/user-not-found') this.presentRegisterAlert(4);

    // Contraseña débil
    if(errorCode == 'auth/weak-password') this.presentRegisterAlert(5);

  }

  // Alert para informar al usuario de los problemas que han ocurrido al registrar su correo
  async presentRegisterAlert(errorCode: number){
    
    // Correo no válido
    if(errorCode == 1){
      const alert = await this.alert.create({
        header: 'Correo no válido',
        message: 'Esta dirección de correo no es válida, por favor, vuelve a intentarlo',
        buttons: ['OK']
      });

      await alert.present();

    }
    
    // Contraseña incorrecta
    if(errorCode == 2){
      const alert = await this.alert.create({
        header: 'Contraseña incorrecta',
        message: 'La contraseña que has introducido no es correcta, inténtalo de nuevo',
        buttons: ['OK']
      });

      await alert.present();

    }

    // Correo en uso
    if(errorCode == 3){
      const alert = await this.alert.create({
        header: 'Correo en uso',
        message: 'Esta dirección de correo ya está registrada, inicia sesión o regístrate con otra cuenta',
        buttons: ['OK']
      });

      await alert.present();

    }
    
    // Usuario no encontrado
    if(errorCode == 4){
      const alert = await this.alert.create({
        header: 'Usuario no encontrado',
        message: 'El usuario que has introducido no se ha encontrado, inténtalo de nuevo',
        buttons: ['OK']
      });

      await alert.present();

    }

    // Contraseña débil
    if(errorCode == 5){
      const alert = await this.alert.create({
        header: 'Contraseña débil',
        message: 'Utiliza una contraseña segura, de al menos 6 dígitos',
        buttons: ['OK']
      });

      await alert.present();

    }

  }

}
