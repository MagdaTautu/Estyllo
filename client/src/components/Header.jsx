import React, { useState, useEffect } from 'react';
import "../styles/header.css";
import "../styles/fonts.css";
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation(); // Get the current location
  const [visible, setVisible] = useState("");

  const toggleMenu = () => {
    setVisible((prevVisible) => (prevVisible === "" ? "visible" : ""));
  };

  useEffect(() => {
    // Reset the visible state whenever the route changes
    setVisible("");
  }, [location]); // Trigger this effect on location change

  return (
    <div id='header'>
      <div className="content">
        <ul className='navbar'>
          <Link to={"/"}><li className='nav-item'>Pagina principala</li></Link>
          <Link to={"/preturi"}><li className='nav-item'>Preturi</li></Link>
          <Link to={"/contact"}><li className='nav-item'>Contact</li></Link>
          <Link to={"/rezervare"}><li id='rezervare'>Fa o rezervare</li></Link>
        </ul>
        <div className={`toggle-menu ${visible}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={`mobile-menu ${visible}`}>
        
        <Link to={"/"}><li className='nav-item'>Pagina principala</li></Link>
        <Link to={"/preturi"}><li className='nav-item'>Preturi</li></Link>
        <Link to={"/contact"}><li className='nav-item'>Contact</li></Link>
        <Link to={"/rezervare"}><li id='rezervare'>Fa o rezervare</li></Link>
      </ul>
    </div>
  );
}

export default Header;
