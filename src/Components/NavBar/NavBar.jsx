import React, {useState, useEffect} from 'react';
import GoogleAuth from '../GoogleAuth/GoogleAuth';


export default function NavBar() {
   



   return (
      <div>
         <div>
            <img src={photoUrl} alt="avatar" />
            <div></div>
         </div>
         <GoogleAuth />
      </div>
   )

}