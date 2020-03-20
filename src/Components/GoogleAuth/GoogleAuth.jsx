import React from 'react';
import {useFirebase} from 'react-redux-firebase';

export default function GoogleAuth() {

   const firebase = useFirebase();
   function loginWithGoogle() {
      return firebase.login({ provider: 'google', type: 'popup', prompt: 'select_account' })
    }

    function handleSignOut() {
       
    }


   // var provider = new firebase.auth.GoogleAuthProvider();
   // // Specify additional OAuth 2.0 scopes that you want to request from the authentication provider. To add a scope, call addScope
   // // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

   // // To localize the provider's OAuth flow to the user's preferred language without explicitly passing the relevant custom OAuth parameters, update the language code on the Auth instance before starting the OAuth flow.
   // // To apply the default browser preference instead of explicitly setting it.
   // firebase.auth().useDeviceLanguage();

   // //Specify additional custom OAuth provider parameters that you want to send with the OAuth request. 
   // provider.setCustomParameters({
   //    prompt: 'select_account',
   //  });
   
   // function googleSignin() {
   //    firebase.auth() 
   //    .signInWithPopup(provider).then(function(result) {
   //       var token = result.credential.accessToken;
   //       var user = result.user;
         
   //       console.log(token)
   //       console.log(user)
   //    }).catch(function(error) {
   //       var errorCode = error.code;
   //       var errorMessage = error.message;
         
   //       console.log(error.code)
   //       console.log(error.message)
   //    });
   // }

   // function googleSignout() {
   //    firebase.auth().signOut()
      
   //    .then(function() {
   //       console.log('Signout Successfull')
   //    }, function(error) {
   //       console.log('Signout Failed')  
   //    });
   // }

   return (
      <div>
         <button onClick={() => loginWithGoogle()}>Google Signin</button>
         <button onClick={() => handleSignOut()}>Google Signout</button>
      </div>
   )

}