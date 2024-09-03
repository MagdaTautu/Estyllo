import React, {useContext, useState, useEffect } from 'react';

import "../styles/rezervare.css";
import logo from "../assets/images/logo_mic.png";
import DateSlider from "../components/DateSlider.jsx";

function Rezervare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pricesCoafor, setPricesCoafor] = useState([]);
  const [pricesFrizerie, setPricesFrizerie] = useState([]);
  const [pricesCosmeticaFemei, setPricesCosmeticaFemei] = useState([]);
  const [pricesManichiura, setPricesManichiura] = useState([]);


  const [activeCoaforIndex, setActiveCoaforIndex] = useState(null);
  const [activeManiIndex, setActiveManiIndex] = useState(null);
  const [activeCosmeticaFemeiIndex, setActiveCosmeticaFemei] = useState(null);
  const [activeCosmeticaBarbatiIndex, setActiveCosmeticaBarbati] = useState(null);
  const [activeFrizerieIndex, setActiveFrizerieIndex] = useState(null);


  const [services, setServices] = useState([]);
  const [activeNav, setActiveNav] = useState("coafor"); // State for active navbar link
  const [total, setTotal] = useState(0);
  const [type, setType] = useState([]);
  const [team, setTeam] = useState([]);
  const [final, setFinal] = useState("")

  const fetchPrices = async (service_name) => {
    try {
      const response = await fetch(
        `https://estyllo.onrender.com:443/api/preturi/general?service=${service_name}`
      );
      const data = await response.json();
      if (service_name === "coafor_femei") {
        setPricesCoafor(data);
        setActiveCoaforIndex(null);
      } else if (service_name === "frizerie") {
        setPricesFrizerie(data);
        setActiveFrizerieIndex(null);
      }
      else if (service_name === "cosmetica_femei") {
        setPricesCosmeticaFemei(data);
        setActiveCosmeticaFemei(null);
      }
      else if (service_name === "mani_pedi") {
        setPricesManichiura(data);
        setActiveManiIndex(null);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const [personal, setPersonal] = useState({
    coafor_femei: [],
    frizerie: [],
    mani_pedi: [],

  });
  const fetchPersonal = async (service_name) => {
   
    try {
      const response = await fetch(
        `https://estyllo.onrender.com:443/api/personal/getPersonal?service=${service_name}`
      );
      const data = await response.json();
      const pers = data.map((person) => person.nume);

      // Update personal state based on service_name
      setPersonal((prevPersonal) => ({
        ...prevPersonal,
        [service_name]: pers,
      }));
    } catch (error) {
      console.error("Error fetching personal:", error);
    }
  };
  // console.log(personal)

  const handleCheckService = (index, service, price, type) => {
    if(service === "coafor")
      setActiveCoaforIndex(index);
    else if (service === "frizerie")
      setActiveFrizerieIndex(index)

    else if (service === "cosmetica_femei")
      setActiveCosmeticaFemei(index);
    
    else if (service === "cosmetica_barbati")
      setActiveCosmeticaBarbati(index);
 
    else if (service === "mani_pedi")
    {
      console.log(service)
      setActiveManiIndex(index);

    }


    setServices([{ service, price, type }]);
    setTotal(price);
  };

  

  const handleSetTypes = (service) => {
    // console.log(service)

    setType((prevServices) => {
      const serviceExists = prevServices.some((s) => s.service === service);

      if (!serviceExists) {
        return [...prevServices, { service }];
      }
      return prevServices;
    });
  };
  const handleActive = () => {
    if(currentIndex === 0 || currentIndex === 1)
      setNextPage(true)
    else 
    setNextPage(false)
  }

  const nextPage = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if(currentIndex === 2)
      setCurrentIndex(0)
    else{
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
      services.forEach((serviceObj) => {
        fetchPersonal(serviceObj.type);
      });
      if (selectedPersonal.length > 0) {
        handleShowDays(team);
      }
    }
    if(currentIndex == 2){
      setFinal("final")
    }
    else setFinal("")

  };

  const prevPage = () => {
    if(currentIndex === 0)
    {
      setCurrentIndex(0)
    }
    else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 ) % 3);
      
    }
    
    setPersonal([]);
  }

  const handleNavClick = (sectionId) => {
    setActiveNav(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  
  const [selectedPersonal, setSelectedPersonal] = useState([]);
  const handlePersonalClick = (person) => {
    setSelectedPersonal([person]);
    fetchTeam(person);
  };

  const fetchTeam = async (person) => {
    try {
      const response = await fetch(
        `https://estyllo.onrender.com:443/api/personal/getTeam?person=${person}`
      );
      const data = await response.json();
      const team = data.map((team) => team.echipa);
      setTeam(team);
    } catch (error) {
      console.error("Error fetching personal:", error);
    }
  };
  const [highlightedDates, setHighlightedDates] = useState([]);

  const handleShowDays = async (team) => {
    try {
      const response = await fetch(
        `https://estyllo.onrender.com:443/api/personal/get-schedule?team=${team}`
      );
      const data = await response.json();

      const formattedDates = data.map((item) => {
        const [year, month, day] = item.data.split("T")[0].split("-");
        return `${year}-${parseInt(month, 10)}-${parseInt(day, 10)}`;
      });

      setHighlightedDates(formattedDates);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };
  const titles = ["Serviciile", "Specialistul", "Data"];
  const [nextPageVar, setNextPage] = useState(false);
  useEffect(() => {
    fetchPrices("coafor_femei");
    fetchPrices("frizerie");
    fetchPrices("cosmetica_femei");
    fetchPrices("mani_pedi");
  }, []);
  useEffect(() => {
    
    handleActive()
  }, [currentIndex]);

  const [selectedService, setSelectedService] = useState("")
  const handleSetService = (service) =>{
    setSelectedService(service)
  }
  const [date, setDate] = useState()
  const [hour, setHour] = useState()

  return (
    <div id="rezervare">
      <div className="header">
        <div className="left">
          <button className="prev" id="prev" onClick={prevPage}>
            Inapoi
          </button>
          <p className="title">Alege {titles[currentIndex]}</p>
          <p>
            Pasul <span>{currentIndex + 1}</span> din 3
          </p>
        </div>
        <div className={`right ${nextPageVar === true  ? "active" : "inactive"}`}>
          <button className={`next ${nextPageVar === true  ? "active" : "inactive"} ${currentIndex === 3  ? "none" : ""}`} id="next" onClick={nextPage}  >
            
            {
             currentIndex === 2 ? " Finalizare" : "Continua"
            }
            
          </button>
          <p className="info">Rezerva ora si ziua pentru a continua.</p>
        </div>
      </div>

      <div className="bottom">
        <div className="content">
          <div className={`page ${currentIndex === 0 ? "active" : ""}`} id="select_services">
            <ul className="navbar">
              <li
                className={`nav-item ${activeNav === "coafor" ? "active" : ""}`}
                onClick={() => handleNavClick("coafor")}
              >
                Coafor
              </li>
              <li
                className={`nav-item ${
                  activeNav === "frizerie" ? "active" : ""
                }`}
                onClick={() => handleNavClick("frizerie")}
              >
                Frizerie
              </li>
              <li
                className={`nav-item ${
                  activeNav === "cosmetica_femei" ? "active" : ""
                }`}
                onClick={() => handleNavClick("cosmetica_femei")}
              >
                Cosmetica Femei
              </li>
              <li
                className={`nav-item ${
                  activeNav === "cosmetica_barbati" ? "active" : ""
                }`}
                onClick={() => handleNavClick("cosmetica_barbati")}
              >
                Cosmetica Barbati
              </li>
              <li
                className={`nav-item ${activeNav === "mani_pedi" ? "active" : ""}`}
                onClick={() => handleNavClick("mani_pedi")}
              >
                Manichiura si pedichiura
              </li>
            </ul>
            <div id="coafor">
              <p className="title">Coafor</p>
              <ul className="prices">
                {pricesCoafor.map((priceObj, index) => (
                  <li
                    key={index}
                    className={
                      services.some((s) => s.service === priceObj.serviciu)
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      handleCheckService(
                        index,
                        priceObj.serviciu,
                        priceObj.pret,
                        "coafor_femei"
                      );
                      handleSetTypes("coafor_femei");
                      handleSetService(priceObj.serviciu)
                    }}
                    value="coafor_femei"
                  >
                    <div>
                      <div className="checkbox">
                        <div
                          className={`inside ${
                            services.some(
                              (s) => s.service === priceObj.serviciu
                            )
                              ? "checked"
                              : ""
                          }`}
                        ></div>
                      </div>
                      {priceObj.serviciu}
                    </div>
                    <span>{priceObj.pret} RON</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="frizerie">
              <p className="title">Frizerie</p>
              <ul className="prices">
                {pricesFrizerie.map((priceObj, index) => (
                  <li
                    key={index}
                    className={
                      services.some((s) => s.service === priceObj.serviciu)
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      handleCheckService(
                        index,
                        priceObj.serviciu,
                        priceObj.pret,
                        "frizerie"
                      );
                      handleSetTypes("frizerie");
                      handleSetService(priceObj.serviciu)
                    }}
                    value="frizerie"
                  >
                    <div>
                      <div className="checkbox">
                        <div
                          className={`inside ${
                            services.some(
                              (s) => s.service === priceObj.serviciu
                            )
                              ? "checked"
                              : ""
                          }`}
                        ></div>
                      </div>
                      {priceObj.serviciu}
                    </div>
                    <span>{priceObj.pret} RON</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="cosmetica_femei">
              <p className="title">Cosmetica Femei</p>
              <ul className="prices">
                {pricesCosmeticaFemei.map((priceObj, index) => (
                  <li
                    key={index}
                    className={
                      services.some((s) => s.service === priceObj.serviciu)
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      handleCheckService(
                        index,
                        priceObj.serviciu,
                        priceObj.pret,
                        "cosmetica"
                      );
                      handleSetTypes("cosmetica");
                      handleSetService(priceObj.serviciu)
                    }}
                    value="cosmetica"
                  >
                    <div>
                      <div className="checkbox">
                        <div
                          className={`inside ${
                            services.some(
                              (s) => s.service === priceObj.serviciu
                            )
                              ? "checked"
                              : ""
                          }`}
                        ></div>
                      </div>
                      {priceObj.serviciu}
                    </div>
                    <span>{priceObj.pret} RON</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="mani_pedi">
              <p className="title">Manichiura si Pedichiura</p>
              <ul className="prices">
                {pricesManichiura.map((priceObj, index) => (
                  <li
                    key={index}
                    className={
                      services.some((s) => s.service === priceObj.serviciu)
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      handleCheckService(
                        index,
                        priceObj.serviciu,
                        priceObj.pret,
                        "mani_pedi"
                      );
                      handleSetTypes("mani_pedi");
                      handleSetService(priceObj.serviciu)
                    }}
                    value="mani_pedi"
                  >
                    <div>
                      <div className="checkbox">
                        <div
                          className={`inside ${
                            services.some(
                              (s) => s.service === priceObj.serviciu
                            )
                              ? "checked"
                              : ""
                          }`}
                        ></div>
                      </div>
                      {priceObj.serviciu}
                    </div>
                    <span>{priceObj.pret} RON</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`page ${currentIndex === 1 ? "active" : ""}`} id="select_specialist">

            {personal.coafor_femei?.length>0 ? <h1>Coafor</h1> : ""}
            <ul className="prices">
              {personal.coafor_femei?.map((pers, index) => (
                <li
                  key={index}
                  onClick={() => handlePersonalClick(pers)}
                  className={selectedPersonal.includes(pers) ? "selected" : ""}
                >
                  <div>
                  <div className="checkbox">
                      <div
                        className={`inside ${
                          selectedPersonal[0] === pers ? "checked" : ""
                        }`}
                      ></div>
                    </div>
                    {pers}
                  </div>
                </li>
              ))}
            </ul>

            {personal.frizerie?.length>0 ? <h1>Frizerie</h1> : ""}
            <ul className="prices">
              {personal.frizerie?.map((pers, index) => (
                <li
                  key={index}
                  onClick={() => handlePersonalClick(pers)}
                  className={selectedPersonal.includes(pers) ? "selected" : ""}
                >
                  <div>
                    <div className="checkbox">
                      <div
                        className={`inside ${
                          selectedPersonal.includes(pers) ? "checked" : ""
                        }`}
                      ></div>
                    </div>
                    {pers}
                  </div>
                </li>
              ))}
            </ul>
            
            {personal.mani_pedi?.length>0 ? <h1>Manichiura si Pedichiura</h1> : ""}
            <ul className="prices">
              {personal.mani_pedi?.map((pers, index) => (
                <li
                  key={index}
                  onClick={() => handlePersonalClick(pers)}
                  className={selectedPersonal.includes(pers) ? "selected" : ""}
                >
                  <div>
                    <div className="checkbox">
                      <div
                        className={`inside ${
                          selectedPersonal.includes(pers) ? "checked" : ""
                        }`}
                      ></div>
                    </div>
                    {pers}
                  </div>
                </li>
              ))}
            </ul>

            {personal.cosmetica?.length>0 ? <h1>Cosmetica</h1> : ""}
            <ul className="prices">
              {personal.cosmetica?.map((pers, index) => (
                <li
                  key={index}
                  onClick={() => handlePersonalClick(pers)}
                  className={selectedPersonal.includes(pers) ? "selected" : ""}
                >
                  <div>
                    <div className="checkbox">
                      <div
                        className={`inside ${
                          selectedPersonal.includes(pers) ? "checked" : ""
                        }`}
                      ></div>
                    </div>
                    {pers}
                  </div>
                </li>
              ))}
            </ul>
          </div>




          <div className={`page ${currentIndex === 2 ? "active" : ""}`} id="select_date">
            <p>Date disponibile</p>
            <DateSlider setNextPage={setNextPage} highlightedDates={highlightedDates} selectedPersonal={selectedPersonal}  selectedService={selectedService} setDate={setDate}  setHour={setHour}/>
            {/* <HourPicker highlightedDates={highlightedDates}/> */}
          </div>

          
        </div>
        <div className={`right ${final}`}>
          <div className={`top ${final}`}>
            <img src={logo} alt="" />
            <div className="info">
              <p className="title">Estyllo HAIR SALON</p>
              <p className="location"></p>
            </div>
          </div>
          <div className={`bottom ${final}`}>
            <div className="info">
              <ul>
                {services.map((serviceObj, index) => (
                  <>
                    <li key={index}>
                      {serviceObj.service} <span>{serviceObj.price} RON</span>
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div className="info total">
              <p>Total</p>
              <span>{total} RON</span>
              <p className="small">
                Personal : <br></br>
                {selectedPersonal?.map((pers, index) => (
                  <>{pers} | </>
                ))}
              </p>
            </div>
          </div>
          <div className={`mobile ${final}`}>
            <h1>Te asteptam cu drag in data de {date} la ora {hour} pentru {selectedService}</h1>
            <a href="/">Continua</a>
            <p>In cazul in care doresti sa anulezi programarea, te rog sa accesezi sectiunea <a href="/contact">CONTACT</a>.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Rezervare;
