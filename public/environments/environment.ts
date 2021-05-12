import firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCh1kV_xFnW1W3dr4tCAfyuysX_aGtUQik",
    authDomain: "chickenhelper-70bc6.firebaseapp.com",
    projectId: "chickenhelper-70bc6",
    storageBucket: "chickenhelper-70bc6.appspot.com",
    messagingSenderId: "1092527013895",
    appId: "1:1092527013895:web:a7f28880b8362490e7aaa2",
    measurementId: "G-29BZHE81EG"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();

 // console.log('Firebase configurado')

