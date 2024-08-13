import React from 'react'
import logo_mic from "../assets/images/logo_mic.png"

import "../styles/footer.css"
function Footer() {
  return (
    <div id='footer'>
        <div className="overlay"></div>
        <img src={logo_mic} alt="" />
        <div className="info">
            <div className="left">
                <div className="line">
                    <p className="title">Program</p>
                    <p className="text">Luni-Duminica 9:00 - 21:00</p>
                </div>
                <div className="line">
                    <p className="title">Locatie</p>
                    <p className="text">Auchan Titan, Bulevardul 1 Decembrie 1918 3, București 021681</p>
                </div>
            </div>
            <div className="right">
                <div className="line">
                    <p className="title">Telefon</p>
                    <p className="text">0724 578 794</p>
                </div>
                <div className="line">
                    <p className="title">Email</p>
                    <p className="text">estyllo@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer