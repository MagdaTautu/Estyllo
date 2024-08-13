import React, { useState, useEffect, act } from 'react';
import logo from "../assets/images/logo.png";
import fb from "../assets/images/icons/fb.png";
import insta from "../assets/images/icons/insta.png";
import "../styles/home.css";
import { Link } from 'react-router-dom';
function Home() {
  const [reviews, setReviews] = useState([]);

  const fetchGoogleReviews = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/reviews/getReviews');
        const data = await response.json();
        setReviews(data);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    fetchGoogleReviews();
  }, []);
  const [active, setActive] = useState("")
  const displayProgram = (active) => {
    if(active === "")
    setActive("active")
    else setActive("")
  }

  return (
    <div id='home'>
      <div className="left">
        <img src={logo} alt="" className='logo' />
        <div className="bottom">
          <div className="socials">
            <img src={fb} alt="" />
            <img src={insta} alt="" />
          </div>
          <div className="buttons">
            <Link to={"/rezervare"}>
              <button id='rezerva'>REZERVA</button>
            </Link>
            <button className='program' onClick={()=> {displayProgram(active)}}>Program</button>
            <div className={`program ${active}`}>
              <ul>
                <li>Luni: <span>9:00-21:00</span> </li>
                <li>Marti: <span>9:00-21:00</span></li>
                <li>Miercuri: <span>9:00-21:00</span></li>
                <li>Joi: <span>9:00-21:00</span></li>
                <li>Vineri:<span>9:00-21:00</span></li>
                <li>Weekend: <span>9:00-21:00</span></li>
               
              </ul>
            </div>
          </div>
        </div>
        
      </div>
      <div className="right">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.651982645862!2d26.175165812256903!3d44.41978667095535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x67798fa4329d7567%3A0x7e83fe871199a36a!2seSTYLLO%20HAIR%20STUDIO!5e0!3m2!1sen!2sro!4v1722774471362!5m2!1sen!2sro" width="600" height="450"></iframe>
        {/* <div className="reviews">
          <h2>Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <p><strong>{review.author_name}</strong> ({review.rating} stars)</p>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Home;
