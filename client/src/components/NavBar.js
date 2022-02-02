import React, {Fragment,useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
function NavBar(props) {
  
  
  const handleLogout = () => {

      //  props.setLogout(true)
      //  props.setEmailFromLogin("");
      //  window.location = "/";
      //  console.log(props.logout)
  }
  
  
  
    return (
         <Fragment>

          <Link to="/userRegister">Register</Link> <br/>
          <Link to="/userLogin">Login</Link><br/>
          <Link to="/" >Home</Link><br/>
          <Link to="/" onClick={handleLogout}>Log out</Link>

        </Fragment>
  )}

export default NavBar;
