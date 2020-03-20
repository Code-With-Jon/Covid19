import React, {useState, useEffect} from 'react';
import GoogleAuth from '../GoogleAuth/GoogleAuth';


export default function NavBar() {
   



   return (
      <div>
         <div>
            <img src={null} alt="avatar" />
            <div></div>
         </div>
         <GoogleAuth />
      </div>
   )

}