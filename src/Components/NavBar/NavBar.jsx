import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signInGmail, signOut} from '../../redux/actions/authActions';
import Logo from '../../TalkCovidLogo.png'
import DefaultAvatar from '../../avatar-default.jpg'
export default function NavBar() {

   const dispatch = useDispatch();
   const avatar = useSelector(state => state.firebase.profile.avatarUrl)

   function loginWithGoogle() {
      dispatch(signInGmail())
    }

    function handleSignOut() {
       dispatch(signOut())
      }
      


   return (
      <div>
         <div>
            <img src="https://cdn.pixabay.com/photo/2017/09/11/03/18/virus-icon-2737712_960_720.png" height="50px" alt="Logo"/>
            <img src={Logo} />
            <img src={DefaultAvatar} alt="avatar" />
            <div></div>
            <img src={avatar && avatar} alt="avatar" />
            <button onClick={() => loginWithGoogle()}>Google Signin</button>
            <button onClick={() => handleSignOut()}>Google Signout</button>
         </div>
      </div>
   )

}