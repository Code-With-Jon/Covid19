import * as firebase from 'firebase/app';
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBG6EHQnrp_NewYGSedyy-U8c9JDqP3UIc",
   authDomain: "talkcovid19-b7853.firebaseapp.com",
   databaseURL: "https://talkcovid19-b7853.firebaseio.com",
   projectId: "talkcovid19-b7853",
   storageBucket: "talkcovid19-b7853.appspot.com",
   messagingSenderId: "11087784397",
   appId: "1:11087784397:web:866848d04d62590cee7c84",
   measurementId: "G-WZN3CN34EL"
 };

firebase.initializeApp(firebaseConfig);
export default firebase;