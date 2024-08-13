import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Preturi from './pages/Preturi';
import Rezervare from './pages/Rezervare';
import Program from './pages/Program.jsx';
import Programari from './pages/Programari.jsx';
import StaffAppointments from './pages/StaffAppointments.jsx';

function App() {
  const location = useLocation();
  
  const hideFooterPaths = ['/rezervare', '/program', '/admin/programari', '/admin/appointments'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
      <>
          <Header />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/preturi' element={<Preturi />} />
              <Route path='/rezervare' element={<Rezervare />} />
              <Route path='/program' element={<Program />} />
              <Route path='/admin/programari' element={<Programari />} />
              <Route path="/admin/appointments" element={<StaffAppointments />} />
          </Routes>
          {!shouldHideFooter && <Footer />}
      </>
  );
}

export default App;
