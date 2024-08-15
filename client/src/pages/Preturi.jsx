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

  const fetchPrices = async (url, setPrices) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPrices(data);
    } catch (error) {
        console.error("Error fetching prices:", error.message);
    }
};

  const fetchCoaforPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com/api/preturi/coafor');
      const data = await response.json();
      setPricesCoafor(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchFrizeriePrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com/api/preturi/frizerie');
      const data = await response.json();
      setPricesFrizerie(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchManiPediPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com/api/preturi/manipedi');
      const data = await response.json();
      setPricesManiPedi(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const fetchVopsitPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com/api/preturi/vopsit');
      const data = await response.json();
      setPricesVopsit(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  
  // const fetchCosmeticaFemeiPrices = async () => {
  //   try {
  //     const response = await fetch('https://estyllo.onrender.com/api/preturi/cosmeticafemei');
  //     console.log(response.json())
  //     const data = await response.json();
  //     setPricesCosmeticaFemei(data);
  //   } catch (error) {
  //     console.error("Error fetching prices:", error);
  //   }
  // };

  const fetchCosmeticaFemeiPrices = () => {
    fetchPrices('https://estyllo.onrender.com/api/preturi/cosmeticafemei', setPricesCosmeticaFemei);
  };
  const fetchCosmeticaBarbatiPrices = () => {
    fetchPrices('https://estyllo.onrender.com/api/preturi/cosmeticabarbati', setPricesCosmeticaBarbati);
  };
  // const fetchCosmeticaBarbatiPrices = async () => {
  //   try {
  //     const response = await fetch('https://estyllo.onrender.com/api/preturi/cosmeticabarbati');
  //     const data = await response.json();
  //     setPricesCosmeticaBarbati(data);
  //   } catch (error) {
  //     console.error("Error fetching prices:", error);
  //   }
  // };

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
      <div className="prices">
        <div className="service">
            <p className="title">Coafor</p>
            <ul className='prices'>
              {pricesCoafor.length === 0 ? (
                <li className='item'>No prices available</li>
              ) : (
                pricesCoafor.map((price, index) => (
                  <li key={index} className='item'>
                    <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                  </li>
                ))
              )}
            </ul>
        </div>
        <div className="service">
          <p className="title">Frizerie</p>
            <ul className='prices'>
              {pricesFrizerie.length === 0 ? (
                <li className='item'>No prices available</li>
              ) : (
                pricesFrizerie.map((price, index) => (
                  <li key={index} className='item'>
                    <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                  </li>
                ))
              )}
            </ul>
        </div>
        <div className="service">
          <p className="title">Manichiura | Pedichiura</p>
            <ul className='prices'>
              {pricesManiPedi.length === 0 ? (
                <li className='item'>No prices available</li>
              ) : (
                pricesManiPedi.map((price, index) => (
                  <li key={index} className='item'>
                    <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                  </li>
                ))
              )}
            </ul>
        </div>
        <div className="service">
          <p className="title">Vopsit + manopera</p>
            <ul className='prices'>
              {pricesVopsit.length === 0 ? (
                <li className='item'>No prices available</li>
              ) : (
                pricesVopsit.map((price, index) => (
                  <li key={index} className='item'>
                    <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                  </li>
                ))
              )}
            </ul>
        </div>
        <div className="service">
          <p className="title">Cosmetica femei</p>
            <ul className='prices'>
              {pricesCosmeticaFemei.length === 0 ? (
                <li className='item'>No prices available</li>
              ) : (
                pricesCosmeticaFemei.map((price, index) => (
                  <li key={index} className='item'>
                    <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                  </li>
                ))
              )}
            </ul>
        </div>
        <div className="service">
          <p className="title">Cosmetica barbati</p>
            <ul className='prices'>
              {pricesCosmeticaBarbati.length === 0 ? (
                <li className='item'>No prices available</li>
              ) : (
                pricesCosmeticaBarbati.map((price, index) => (
                  <li key={index} className='item'>
                    <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                  </li>
                ))
              )}
            </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Preturi