import React from 'react'
import "../styles/header.css"
import "../styles/fonts.css"
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div id='header'>
        <ul className='navbar'>
            {/* <li className='nav-item'>Despre noi</li> */}
            {/* <Link><li className='nav-item'>Servicii</li></Link> */}
            <Link to={"/"}><li className='nav-item'>Pagina principala</li></Link>

            <Link to={"/preturi"}><li className='nav-item'>Preturi</li></Link>
            <li className='nav-item'>Contact</li>
            <Link to={"/rezervare"}><li id='rezervare'>Fa o rezervare</li></Link>
        </ul>
    </div>
  )
}

export default Header