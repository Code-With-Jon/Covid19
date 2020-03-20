import React, {useState, useEffect} from 'react';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import firebase from '../../config/firebase';


export default function NavBar() {
   const [name, setName] = useState(null);
   const [email, setEmail] = useState(null);
   const [photoUrl, setPhotoUrl] = useState(null);
   const [emailVerified, setEmailVerified] = useState(null);
   const [uid, setUid] = useState(null);

   useEffect( () => {
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            console.log('hellooo', user);
            setName(user.displayName);
            setEmail(user.email);
            setPhotoUrl(user.photoURL);
            setEmailVerified(user.emailVerified);
            setUid(user.uid);
           // User is signed in.
         } else {
            setName(null);
            setEmail(null);
            setPhotoUrl(null);
            setEmailVerified(null);
            setUid(null);
           // No user is signed in.
         }
      });
   }, [])



   return (
      <div>
         <div>
            <img src={photoUrl} alt="avatar" />
            <div>
               {name} {email} {uid}
            </div>
         </div>
         <GoogleAuth />
      </div>
   )

}