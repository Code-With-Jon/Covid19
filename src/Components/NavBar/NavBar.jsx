import React from 'react';
import {useSelector} from 'react-redux';
import GoogleAuth from '../GoogleAuth/GoogleAuth';


export default function NavBar() {
   
   const avatar = useSelector(state => state.firebase.profile.avatarUrl)


   return (
      <div>
         <div>
            <img src={avatar && avatar} alt="avatar" />
            <div></div>
         </div>
         <GoogleAuth />
      </div>
   )

}