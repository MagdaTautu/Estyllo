import React, { useState, useEffect } from 'react';

import "../styles/preturi.css"
import scissor from "../assets/images/services-icons.png"
function Preturi() {
  const [pricesCoafor, setPricesCoafor] = useState([]);
  const [pricesFrizerie, setPricesFrizerie] = useState([]);
  const [pricesManiPedi, setPricesManiPedi] = useState([]);
  const [pricesVopsit, setPricesVopsit] = useState([]);
  const [pricesCosmeticaFemei, setPricesCosmeticaFemei] = useState([]);
  const [pricesCosmeticaBarbati, setPricesCosmeticaBarbati] = useState([]);

  const [error, setError] = useState(null);

  const fetchPrices = async (url, setPrices) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setPrices(data);
      } else {
        console.error("Expected array but got:", data);
        setPrices([]);  // Set an empty array if the response is not as expected
      }
    } catch (error) {
      console.error("Error fetching prices:", error.message);
      setError(error.message);
      setPrices([]);  // Set an empty array in case of an error
    }
  };

  const fetchCoaforPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/coafor');
      const data = await response.json();
      setPricesCoafor(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchFrizeriePrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/frizerie');
      const data = await response.json();
      setPricesFrizerie(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchManiPediPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/manipedi');
      const data = await response.json();
      setPricesManiPedi(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const fetchVopsitPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/vopsit');
      const data = await response.json();
      setPricesVopsit(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  
  const fetchCosmeticaFemeiPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/cosmeticafemei');
      const data = await response.json();
      setPricesCosmeticaFemei(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  
    const fetchCosmeticaBarbatiPrices = async () => {
      try {
        const response = await fetch('https://estyllo.onrender.com:443/api/preturi/cosmeticabarbati');
        const data = await response.json();
        setPricesCosmeticaBarbati(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

  useEffect(() => {
    fetchCoaforPrices();
    fetchFrizeriePrices();
    fetchManiPediPrices();
    fetchVopsitPrices();
    fetchCosmeticaFemeiPrices();
    fetchCosmeticaBarbatiPrices()
  }, []);
  return (
    <div id="preturi">
      <div className="header">
        <p className="subtitle">beauty salon</p>
        <h1>PRETURI</h1>
        <div className="subheader">
          <div className="line"></div>
          <img src={scissor} alt="" />
          <div className="line"></div>
        </div>
      </div>
      {error && <p className="error-message">Error fetching prices: {error}</p>}
      <div className="prices">
        <div className="service">
          <p className="title">Coafor</p>
          <ul className='prices'>
            {Array.isArray(pricesCoafor) && pricesCoafor.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesCoafor) ? (
              pricesCoafor.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
        </div>
        <div className="service">
          <p className="title">Frizerie</p>
          <ul className='prices'>
            {Array.isArray(pricesFrizerie) && pricesFrizerie.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesFrizerie) ? (
              pricesFrizerie.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
        </div>
        <div className="service">
          <p className="title">Manichiura | Pedichiura</p>
          <ul className='prices'>
            {Array.isArray(pricesManiPedi) && pricesManiPedi.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesManiPedi) ? (
              pricesManiPedi.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
        </div>
        <div className="service">
          <p className="title">Vopsit + manopera</p>
          <ul className='prices'>
            {Array.isArray(pricesVopsit) && pricesVopsit.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesVopsit) ? (
              pricesVopsit.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
        </div>
        <div className="service">
          <p className="title">Cosmetica femei</p>
          <ul className='prices'>
            {Array.isArray(pricesCosmeticaFemei) && pricesCosmeticaFemei.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesCosmeticaFemei) ? (
              pricesCosmeticaFemei.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
        </div>
        <div className="service">
          <p className="title">Cosmetica barbati</p>
          <ul className='prices'>
            {Array.isArray(pricesCosmeticaBarbati) && pricesCosmeticaBarbati.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesCosmeticaBarbati) ? (
              pricesCosmeticaBarbati.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Preturi