import React, { useState, useEffect } from 'react';

import "../styles/preturi.css"
import scissor from "../assets/images/services-icons.png"
function Preturi() {
  const [pricesCoafor, setPricesCoafor] = useState([]);
  const [pricesFrizerie, setPricesFrizerie] = useState([]);
  const [pricesManiPedi, setPricesManiPedi] = useState([]);
  const [pricesVopsit, setPricesVopsit] = useState([]);
  const [pricesCoafat, setPricesCoafat] = useState([]);
  const [pricesCreponat, setPricesCreponat] = useState([]);
  const [pricesAfro, setPricesAfro] = useState([]);
  const [pricesOcazie, setPricesOcazie] = useState([]);
  const [pricesSuvite, setPricesSuvite] = useState([]);
  const [pricesSuviteVopsea, setPricesSuviteVopsea] = useState([]);
  const [pachetVopsit, setPachetVopsit] = useState([]);
  const [pachetVopsitFara, setPachetVopsitFara] = useState([]);
  const [pricesDecolorat, setPricesDecolorat] = useState([]);
  const [pachetDecolorat, setPachetDecolorat] = useState([]);
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
  const fetchCreponatPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/creponat');
      const data = await response.json();
      setPricesCreponat(data)
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const fetchAfroPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/afro');
      const data = await response.json();
      setPricesAfro(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const fetchCoafatPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/coafat');
      const data = await response.json();
      setPricesCoafat(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const fetchCoafatOcazie = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/ocazie');
      const data = await response.json();
      setPricesOcazie(data);
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
  const fetchSuvite = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/suvite');
      const data = await response.json();
      setPricesSuvite(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };
  const fetchSuviteVopsea = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/suvitevopsea');
      const data = await response.json();
      setPricesSuviteVopsea(data);
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

  const fetchVopsitPachete = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/vopsit/pachete-fara');
      const data = await response.json();
      
      setPachetVopsit(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/vopsit/pachete');
      const data = await response.json();
      console.log(data)
      setPachetVopsitFara(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchDecoloratPrices = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/decolorat');
      const data = await response.json();
      setPricesDecolorat(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const fetchDecoloratPachete = async () => {
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/decolorat/pachete');
      const data = await response.json();
      
      setPachetDecolorat(data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
    try {
      const response = await fetch('https://estyllo.onrender.com:443/api/preturi/vopsit/pachete');
      const data = await response.json();
      console.log(data)
      setPachetVopsitFara(data);
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
    fetchCosmeticaBarbatiPrices();
    fetchVopsitPachete();
    fetchDecoloratPachete();
    fetchDecoloratPrices();
    fetchCoafatPrices();
    fetchAfroPrices();
    fetchCreponatPrices();
    fetchCoafatOcazie();
    fetchSuviteVopsea();
    fetchSuvite();
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

          <p className="title">Coafat</p>
          <ul className='prices'>
            {Array.isArray(pricesCoafat) && pricesCoafat.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesCoafat) ? (
              pricesCoafat.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>

          <p className="title">Coafat de Ocazie</p>
          <ul className='prices'>
            {Array.isArray(pricesOcazie) && pricesOcazie.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesOcazie) ? (
              pricesOcazie.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>

          <p className="title">Afro</p>
          <ul className='prices'>
            {Array.isArray(pricesAfro) && pricesAfro.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesAfro) ? (
              pricesAfro.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>

          <p className="title">Creponat Radacini</p>
          <ul className='prices'>
            {Array.isArray(pricesCreponat) && pricesCreponat.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesCreponat) ? (
              pricesCreponat.map((price, index) => (
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
          <p className="title">Vopsit + Manopera</p>
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
          <p className="title">Decolorat suvite</p>
          <ul className='prices'>
            {Array.isArray(pricesSuvite) && pricesSuvite.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesSuvite) ? (
              pricesSuvite.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
          <p className="title">Decolorat Suvite + Vopsea</p>
          <ul className='prices'>
            {Array.isArray(pricesSuviteVopsea) && pricesSuviteVopsea.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesSuviteVopsea) ? (
              pricesSuviteVopsea.map((price, index) => (
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
        <div className="prices pachete">
          <h1>PACHETE</h1>
          <div className="prices">
            <div className="service">
              <p className="title"> Vopsit + Spalat + Tuns + Uscat</p>
              <ul className='prices'>
                {Array.isArray(pachetVopsit) && pachetVopsit.length === 0 ? (
                  <li className='item'>No prices available</li>
                ) : Array.isArray(pachetVopsit) ? (
                  pachetVopsit.map((price, index) => (
                    <li key={index} className='item'>
                      <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                    </li>
                  ))
                ) : (
                  <li className='item'>Invalid data received. Please refresh the page</li>
                )}
              </ul>
              
              <p className="title">Vopsit + Spalat + Tuns + Uscat</p>
              <span>(*cu vopseaua clientei)</span>
              <ul className='prices'>
                {Array.isArray(pachetVopsitFara) && pachetVopsitFara.length === 0 ? (
                  <li className='item'>No prices available</li>
                ) : Array.isArray(pachetVopsitFara) ? (
                  pachetVopsitFara.map((price, index) => (
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
              <p className="title"> Decolorat + Vopsit Par + Tuns + Aranjat</p>
              <ul className='prices'>
                {Array.isArray(pachetDecolorat) && pachetDecolorat.length === 0 ? (
                  <li className='item'>No prices available</li>
                ) : Array.isArray(pachetDecolorat) ? (
                  pachetDecolorat.map((price, index) => (
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
      
    </div>
  )
}

export default Preturi