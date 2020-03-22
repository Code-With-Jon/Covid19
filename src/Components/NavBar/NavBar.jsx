import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signInGmail, signOut} from '../../redux/actions/authActions';
import Logo from '../../TalkCovidLogo.png'
import DefaultAvatar from '../../avatar-default.jpg'
import { Link } from 'react-router-dom';

export default function NavBar(props) {

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
         <div style={{display: 'flex', flexDirection: 'row', background: 'rgba(0,0,0,.87)', }}>
            <Link to='/'>
            <div style={{display: 'flex', flexDirection: 'row'}}>
               <img src="https://cdn.pixabay.com/photo/2017/09/11/03/18/virus-icon-2737712_960_720.png" height="50px" alt="Logo" style={{alignSelf: "center"}}/>
               <img src={Logo} style={{height: '20vh', marginTop: '-2vh'}}/>
            </div>
            </Link>
            <div style={{width: '83vw', textAlign: 'end', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            
                    
                        <img src={avatar ? avatar && avatar : DefaultAvatar} alt="avatar" height="80px" style={{borderRadius: 40}}/>
                        {!avatar ? 
                        <button onClick={() => loginWithGoogle()}>Google Signin</button>
                        :
                        <button onClick={() => handleSignOut()}>Google Signout</button>
                        }
            </div>
         </div>
      </div>
   )

}