import React, { useState, useEffect } from 'react';

import "../styles/preturi.css"
import scissor from "../assets/images/services-icons.png"
function Preturi() {
  const [pricesCoafor, setPricesCoafor] = useState([]);
  const [pricesFrizerie, setPricesFrizerie] = useState([]);
  const [pricesManiPedi, setPricesManiPedi] = useState([]);
  const [pricesDecapaj, setpricesDecapaj] = useState([]);
  const [pricesCoafat, setPricesCoafat] = useState([]);
  const [pricesCreponat, setPricesCreponat] = useState([]);
  const [pricesAfro, setPricesAfro] = useState([]);
  const [pricesOcazie, setPricesOcazie] = useState([]);
  const [pricesExtensii, setPricesExtensii] = useState([]);
  const [pricesSuviteVopsea, setPricesSuviteVopsea] = useState([]);
  const [pachetVopsit, setPachetVopsit] = useState([]);
  const [pachetVopsitFara, setPachetVopsitFara] = useState([]);
  const [pricesDecolorat, setPricesDecolorat] = useState([]);
  const [pachetDecolorat, setPachetDecolorat] = useState([]);
  const [pricesCosmeticaFemei, setPricesCosmeticaFemei] = useState([]);
  const [pricesCosmeticaBarbati, setPricesCosmeticaBarbati] = useState([]);
  const [preturiSuvitePudra, setPreturiSuvitePudra] = useState([]);
  const [preturiSuviteBaza, setPreturiSuviteBaza] = useState([]);
  const [preturi, setPreturi] = useState([]);

  const [error, setError] = useState(null);

  const fetchPrices = async (url, setPrices) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setPrices(data);
      } else {
        console.error("Expected array but got:", data);
        setPrices([]); 
      }
    } catch (error) {
      console.error("Error fetching prices:", error.message);
      setError(error.message);
      setPrices([]);  
    }
  };

  const fetchPreturi = async (table, tip, setPrices) => {
    try {
      const response = await fetch(`https://estyllo.onrender.com:443/api/preturi/preturiGenerale?table=${table}&tip=${tip}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setPrices(data);
        console.log(table, tip)
      } else {
        console.error("Expected array but got:", data);
        setPrices([]);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      setPrices([]);
    }
  };

  


  useEffect(() => {
    fetchPreturi("frizerie", "frizerie", setPricesFrizerie);
    fetchPreturi("mani-pedi", "mani_pedi", setPricesManiPedi);
    fetchPreturi("cosmetica", "cosmetica", setPricesCosmeticaFemei);
    fetchPreturi("coafor_femei", "extensii", setPricesExtensii);
    fetchPreturi("coafor_femei", "creponat", setPricesCreponat);
    fetchPreturi("coafor_femei", "ocazie", setPricesOcazie);
    fetchPreturi("coafor_femei", "coafat", setPricesCoafat);
    fetchPreturi("coafor_femei", "coafor", setPricesCoafor);
    fetchPreturi("vopsit_femei", "suvite_pudra", setPreturiSuvitePudra);
    fetchPreturi("vopsit_femei", "suvite_baza", setPreturiSuviteBaza);
    fetchPreturi("vopsit_femei", "pachet", setPachetVopsit);
    fetchPreturi("vopsit_femei", "pachet_fara", setPachetVopsitFara);
    fetchPreturi("vopsit_femei", "pachet_decolorat", setPachetDecolorat);
    fetchPreturi("vopsit_femei", "decapaj", setpricesDecapaj);
    fetchPreturi("vopsit_femei", "decolorat", setPricesDecolorat);
   

  }, []);
  console.log(preturiSuvitePudra)
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
          <p className="title">Decapaj</p>
          <ul className='prices'>
            {Array.isArray(pricesDecapaj) && pricesDecapaj.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesDecapaj) ? (
              pricesDecapaj.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>

          <p className="title">SUVITE PUDRA+VOPSEA (DOAR SUVITE)</p>
          <ul className='prices'>
            {Array.isArray(preturiSuvitePudra) && preturiSuvitePudra.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(preturiSuvitePudra) ? (
              preturiSuvitePudra.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>

          <p className="title">SUVITE PUDRA + VOPSEA +VOPSIT BAZA</p>
          <ul className='prices'>
            {Array.isArray(preturiSuviteBaza) && preturiSuviteBaza.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(preturiSuviteBaza) ? (
              preturiSuviteBaza.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>

          <p className="title">Decolorat</p>
          <ul className='prices'>
            {Array.isArray(pricesDecolorat) && pricesDecolorat.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesDecolorat) ? (
              pricesDecolorat.map((price, index) => (
                <li key={index} className='item'>
                  <strong>{price.serviciu}</strong><span> {price.pret} RON</span>
                </li>
              ))
            ) : (
              <li className='item'>Invalid data received. Please refresh the page</li>
            )}
          </ul>
          <p className="title">Extensii par natural</p>
          <ul className='prices'>
            {Array.isArray(pricesExtensii) && pricesExtensii.length === 0 ? (
              <li className='item'>No prices available</li>
            ) : Array.isArray(pricesExtensii) ? (
              pricesExtensii.map((price, index) => (
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
        {/* <div className="service"> */}
          {/* <p className="title">Cosmetica barbati</p> */}
          {/* <ul className='prices'> */}
            {/* {Array.isArray(pricesCosmeticaBarbati) && pricesCosmeticaBarbati.length === 0 ? ( */}
              {/* <li className='item'>No prices available</li> */}
            {/* ) : Array.isArray(pricesCosmeticaBarbati) ? ( */}
              {/* pricesCosmeticaBarbati.map((price, index) => ( */}
                {/* <li key={index} className='item'> */}
                  {/* <strong>{price.serviciu}</strong><span> {price.pret} RON</span> */}
                {/* </li> */}
              {/* )) */}
            {/* ) : ( */}
              {/* <li className='item'>Invalid data received. Please refresh the page</li> */}
            {/* )} */}
          {/* </ul> */}
        {/* </div> */}
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