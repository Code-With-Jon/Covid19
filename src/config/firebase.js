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

const rrfConfig = {
   userProfile: 'users', //collection name of where our user is stored.
   useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB. now we can access our user document via state.firebase.profile
   // presence: 'presence', // where list of online users is stored in database
   // sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
   // profileParamsToPopulate: [ 'conversations:conversations' ], //DOES NOT WORK FOR FIRESTORE
}

//redux-firestore config
const rfConfig = {
}

export {rrfConfig, rfConfig}

export default firebase;