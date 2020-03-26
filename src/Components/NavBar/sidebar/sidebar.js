import React from "react";
import { slide as Menu } from "react-burger-menu";
import {Link, useHistory} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


export default props => {


  function scrollToElement(el) {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate, behavior: 'smooth' }); 
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
    
    </Menu>
  );
};