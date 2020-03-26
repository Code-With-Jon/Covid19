import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signInGmail, signOut} from '../../redux/actions/authActions';
import Logo from '../../TalkCovidLogo.png'
import DefaultAvatar from '../../avatar-default.jpg'
import { Button } from 'semantic-ui-react'
import {Link, useHistory} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {scrollToTopSmooth} from '../../utils/helperFunctions';
import './NavBar.css'
import SideBar from "./sidebar/sidebar";

export default function NavBar(props) {

   const dispatch = useDispatch();
   const avatar = useSelector(state => state.firebase.profile.avatarUrl)
   const history = useHistory();

   function loginWithGoogle() {
      dispatch(signInGmail())
    }

    function handleSignOut() {
       dispatch(signOut())
      }



    function scrollToElement(el) {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: yCoordinate, behavior: 'smooth' }); 
    }

    


   return (
      <div>
         <div className='menu'>
         <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <Link to='/'>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '5vw'}}>
               <img src="https://cdn.pixabay.com/photo/2017/09/11/03/18/virus-icon-2737712_960_720.png" height="50px" alt="Logo" style={{alignSelf: "center"}}/>
               <img src={Logo} style={{height: '20vh', marginTop: '-2vh'}}/>
            </div>
            </Link>
        
            <div style={{width: '77vw', textAlign: 'end', flexDirection: 'row', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
         <nav className='nav'>
          <ul style={{display: 'flex', flexDirection: 'row', listStyleType: 'none', color: 'white', paddingRight: '5vw'}}>
            <li>
              <Link to="/" onClick={() => scrollToTopSmooth()}>HOME</Link>
            </li>
            <li style={{paddingLeft: '2vw', paddingRight: '2vw'}} >
              <HashLink to="/#metrics" smooth scroll={scrollToElement}>METRICS</HashLink>
            </li>
            <li>
            <HashLink to="/learn/#learn" smooth scroll={scrollToElement}>LEARN</HashLink>
            </li>
          </ul>
          
        </nav>
        
                    
                        <img src={avatar ? avatar && avatar : DefaultAvatar} alt="avatar" height="80px" style={{borderRadius: 40}}/>
                        {!avatar ? 
                          <Button secondary onClick={() => loginWithGoogle()}>Google Signin</Button>
                        :
                        <Button secondary onClick={() => handleSignOut()}>Signout</Button>
                        }
            </div>
         </div>
      </div>
   )

}