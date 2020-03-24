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


     const handleScrollTo = (elRef) => {
         // Incase the ref supplied isn't ref.current
         const el = elRef.current ? elRef.current : elRef
         
         // Scroll the element into view
         el.scrollIntoView({
           behavior: 'smooth',
           block: 'start'
         })
       }


   return (
      <div>
         <div style={{display: 'flex', flexDirection: 'row', background: 'rgba(0,0,0,.87)', }}>
            <Link to='/'>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '5vw'}}>
               <img src="https://cdn.pixabay.com/photo/2017/09/11/03/18/virus-icon-2737712_960_720.png" height="50px" alt="Logo" style={{alignSelf: "center"}}/>
               <img src={Logo} style={{height: '20vh', marginTop: '-2vh'}}/>
            </div>
            </Link>
            <div style={{width: '78vw', textAlign: 'end', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <nav>
          <ul style={{display: 'flex', flexDirection: 'row', listStyleType: 'none', color: 'white', paddingRight: '5vw'}}>
            <li onClick={() => { this.handleScrollTo(this.refA) }}>
              HOME
            </li>
            <li style={{paddingLeft: '2vw', paddingRight: '2vw'}} onClick={() => { this.handleScrollTo(this.refB) }}>
              METRICS
            </li>
            <li onClick={() => { this.handleScrollTo(this.refC) }}>
              LEARN
            </li>
          </ul>
        </nav>
                    
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