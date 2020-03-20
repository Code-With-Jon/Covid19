import React, {useState, useEffect} from 'react';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import Logo from '../../TalkCovidLogo.png'

export default function NavBar() {
   



   return (
      <div>
         <div>
            <img src="https://cdn.pixabay.com/photo/2017/09/11/03/18/virus-icon-2737712_960_720.png" height="50px" />
            <img src={Logo} />
            <img src={null} alt="avatar" />
            <div></div>
         </div>
         <GoogleAuth />
      </div>
   )

}