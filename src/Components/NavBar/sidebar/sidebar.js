import React from "react";
import { slide as Menu } from "react-burger-menu";
import {Link, useHistory} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


export default props => {


  function scrollToElement(el) {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate, behavior: 'smooth' }); 
  }

  function handleLogIn(){
    props.login()
  }
  function handleLogOut(){
    props.logout()
  }

  return (
    // Pass on our props
    <Menu {...props}>
       <Link className="menu-item" to='/'>
        HOME
      </Link>

      <HashLink className="menu-item" to="/#metrics" smooth scroll={scrollToElement}>
        METRICS
      </HashLink>

      <HashLink className="menu-item" to="/learn/#learn" smooth scroll={scrollToElement}>
        LEARN
        </HashLink>
    {!props.avatar ?
      <HashLink className="menu-item" onClick={() => handleLogIn()} smooth scroll={scrollToElement}>
        LOG IN
        </HashLink>
      :
      <HashLink className="menu-item" onClick={() => handleLogOut()} smooth scroll={scrollToElement}>
        LOG OUT
        </HashLink>
}
    </Menu>
  );
};