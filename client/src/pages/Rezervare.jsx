import React, { useState, useEffect } from "react";
import "../styles/rezervare.css";
import logo from "../assets/images/logo_mic.png";
import DateSlider from "../components/DateSlider.jsx";
import HourPicker from "../components/HourPicker";
function Rezervare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pricesCoafor, setPricesCoafor] = useState([]);
  const [pricesFrizerie, setPricesFrizerie] = useState([]);
  const [activeCoaforIndex, setActiveCoaforIndex] = useState(null);
  const [activeFrizerieIndex, setActiveFrizerieIndex] = useState(null);
  const [services, setServices] = useState([]);
  const [activeNav, setActiveNav] = useState("coafor"); // State for active navbar link
  const [total, setTotal] = useState(0);
  const [type, setType] = useState([]);
  const [team, setTeam] = useState([]);

  const fetchPrices = async (service_name) => {
    try {
      const response = await fetch(
        `https://estyllo.onrender.comapi/preturi/general?service=${service_name}`
      );
      const data = await response.json();
      if (service_name === "coafor_femei") {
        setPricesCoafor(data);
        setActiveCoaforIndex(null);
      } else if (service_name === "frizerie") {
        setPricesFrizerie(data);
        setActiveFrizerieIndex(null);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const [personal, setPersonal] = useState({
    coafor_femei: [],
    frizerie: [],
  });
  const fetchPersonal = async (service_name) => {
    try {
      const response = await fetch(
        `https://estyllo.onrender.comapi/personal/getPersonal?service=${service_name}`
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

  // const handleCheckCoafor = (index, service, price,type) => {
  //     setActiveCoaforIndex(index);
  //     setServices(prevServices => {
  //         const isServiceSelected = prevServices.some(s => s.service === service);
  //         let updatedServices;
  //         if (isServiceSelected) {
  //             updatedServices = prevServices.filter(s => s.service !== service);
  //             setTotal(prevTotal => prevTotal - price/2);
  //         } else {
  //             updatedServices = [...prevServices, { service, price,type }];
  //             setTotal(prevTotal => prevTotal + price/2);
  //         }
  //         return updatedServices;
  //     });
  // };
  const handleCheckCoafor = (index, service, price, type) => {
    setActiveCoaforIndex(index);
    setServices([{ service, price, type }]);
    setTotal(price);
  };

  // const handleCheckFrizerie = (index, service, price, type) => {
  //     setActiveFrizerieIndex(index);
  //     setServices(prevServices => {
  //         const isServiceSelected = prevServices.some(s => s.service === service);
  //         let updatedServices;
  //         if (isServiceSelected) {
  //             updatedServices = prevServices.filter(s => s.service !== service);
  //             setTotal(prevTotal => prevTotal - price/2);
  //         } else {
  //             updatedServices = [...prevServices, { service, price,type }];
  //             setTotal(prevTotal => prevTotal + price/2);
  //         }
  //         return updatedServices;
  //     });
  // };
  const handleCheckFrizerie = (index, service, price, type) => {
    setActiveFrizerieIndex(index);
    setServices([{ service, price, type }]);
    setTotal(price);
  };
  const handleSetTypes = (service) => {
    setType((prevServices) => {
      const serviceExists = prevServices.some((s) => s.service === service);

      if (!serviceExists) {
        return [...prevServices, { service }];
      }
      return prevServices;
    });
  };
  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    services.forEach((serviceObj) => {
      fetchPersonal(serviceObj.type);
    });
    if (selectedPersonal.length > 0) {
      handleShowDays(team);
    }
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    setPersonal([]);
  };

  const handleNavClick = (sectionId) => {
    setActiveNav(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchPrices("coafor_femei");
    fetchPrices("frizerie");
  }, []);
  const [selectedPersonal, setSelectedPersonal] = useState([]);
  const handlePersonalClick = (person) => {
    setSelectedPersonal((prevSelected) => {
      const isSelected = prevSelected.includes(person);
      if (isSelected) {
        return prevSelected.filter((item) => item !== person);
      } else {
        return [...prevSelected, person];
      }
    });
    fetchTeam(person);
  };

  console.log(selectedPersonal)
  const fetchTeam = async (person) => {
    try {
      const response = await fetch(
        `https://estyllo.onrender.comapi/personal/getTeam?person=${person}`
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
        `https://estyllo.onrender.comapi/personal/get-schedule?team=${team}`
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
  const staticHighlightedDates = ["2024-8-9", "2024-8-10"];
  const titles = ["Serviciile", "Specialistul", "Data"];
  // console.log(selectedPersonal)
  return (
    <div id="rezervare">
      <div className="header">
        <div className="left">
          <button className="prev" id="prev" onClick={prevPage}>
            Inapoi
          </button>
          <p className="title">Alege {titles[currentIndex]}</p>
          <p>
            Pasul <span>{currentIndex + 1}</span> din 4
          </p>
        </div>
        <div className="right">
          <button className="next" id="next" onClick={nextPage}>
            Continua
          </button>
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
                  activeNav === "cos_fem" ? "active" : ""
                }`}
                onClick={() => handleNavClick("cos_fem")}
              >
                Cosmetica Femei
              </li>
              <li
                className={`nav-item ${
                  activeNav === "cos_barb" ? "active" : ""
                }`}
                onClick={() => handleNavClick("cos_barb")}
              >
                Cosmetica Barbati
              </li>
              <li
                className={`nav-item ${activeNav === "mani" ? "active" : ""}`}
                onClick={() => handleNavClick("mani")}
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
                      handleCheckCoafor(
                        index,
                        priceObj.serviciu,
                        priceObj.pret,
                        "coafor_femei"
                      );
                      handleSetTypes("coafor_femei");
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
                      handleCheckFrizerie(
                        index,
                        priceObj.serviciu,
                        priceObj.pret,
                        "frizerie"
                      );
                      handleSetTypes("frizerie");
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
          </div>
          <div className={`page ${currentIndex === 1 ? "active" : ""}`} id="select_specialist">
            {/* <p>Personal</p> */}

            <h1>Coafor</h1>
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
                          selectedPersonal.includes(pers) ? "checked" : ""
                        }`}
                      ></div>
                    </div>
                    {pers}
                  </div>
                </li>
              ))}
            </ul>

            <h1>Frizerie</h1>
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
          </div>
          <div className={`page ${currentIndex === 2 ? "active" : ""}`} id="select_date">
            <p>Date disponibile</p>
            <DateSlider highlightedDates={highlightedDates} selectedPersonal={selectedPersonal} />
            {/* <HourPicker highlightedDates={highlightedDates}/> */}
          </div>
        </div>
        <div className="right">
          <div className="top">
            <img src={logo} alt="" />
            <div className="info">
              <p className="title">Estyllo HAIR SALON</p>
              <p className="location"></p>
            </div>
          </div>
          <div className="bottom">
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
                {/* Personal: {selectedPersonal} */}
                Personal : <br></br>
                {selectedPersonal?.map((pers, index) => (
                  <>{pers} | </>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rezervare;
