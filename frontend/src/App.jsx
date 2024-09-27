import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Intro from "./components/Intro";
import About from './components/About';
import Mission from './components/Mission';
import Services from './components/Services';
import How from './components/How';
import Consult from './components/Consult'; 
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import i18n from './i18n'; // Import i18n

function App() {
  const consultRef = useRef(null);
  const [showMission, setShowMission] = useState(false);
  const [showHow, setShowHow] = useState(false);

  const handleGetToKnowUsClick = () => {
    setShowMission(true);
  };

  const handleHowItWorksClick = () => {
    setShowHow(true);
  };

  const { i18n } = useTranslation(); // Use i18n hook

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; // Change text direction based on language
  };

  return (
    <Router>
      <div className="App">
        <Navbar onLanguageChange={handleLanguageChange} />
        <Routes>
          <Route path="/" element={
            <>
              <Intro consultRef={consultRef} />
              <div id="about"><About onGetToKnowUsClick={handleGetToKnowUsClick} /></div>
              {showMission && <Mission />}
              <Services onHowItWorksClick={handleHowItWorksClick} />
              {showHow && <How />}
              <div id="consult"><Consult ref={consultRef} /></div>
              <Team />
              <div id="contact"><Contact /></div>
              <Footer />
            </>
          } />
          {/* Modify the /services route to include the Footer */}
          <Route path="/services" element={
            <>
              <ServicesPage />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
