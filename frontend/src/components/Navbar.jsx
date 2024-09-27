import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import teleradLogo from './telerad-logo.svg';
import teleradLogoWhite from './telerad-logo-white.svg'; // Import the white logo
import './Navbar.css'; // Ensure you import the CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'ar'); // Get language from localStorage or default to Arabic
  const [isIntroPage, setIsIntroPage] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isMenuBackgroundWhite, setIsMenuBackgroundWhite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Translation hook

  // Set RTL and Arabic as default or the language from localStorage
  useEffect(() => {
    i18n.changeLanguage(language); // Use the language from localStorage or default
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'; // Set text direction
    document.body.classList.toggle('arabic-font', language === 'ar'); // Apply Arabic font conditionally

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsIntroPage(false);
      } else {
        setIsIntroPage(true);
      }
    };

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      if (window.innerWidth > 1000) {
        setIsMenuBackgroundWhite(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [i18n, language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);

    // Set text direction based on selected language
    document.documentElement.dir = selectedLanguage === 'ar' ? 'rtl' : 'ltr';

    // Apply Arabic font conditionally
    document.body.classList.toggle('arabic-font', selectedLanguage === 'ar');

    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage);

    // Close the menu if the viewport is less than or equal to 1000px
    if (viewportWidth <= 1000) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (viewportWidth <= 1000) {
      setIsMenuBackgroundWhite(!isMenuBackgroundWhite);
    }
  };

  // Determine if on /services path
  const isServicesPage = location.pathname === '/services';

  // Handle navigation based on current path
  const handleNavigation = (path, sectionId) => {
    setIsMenuOpen(false); // Close the menu
    if (isServicesPage) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Set the logo source based on the current path and viewport width
  const logoSrc = isServicesPage 
    ? teleradLogo 
    : (isMenuOpen && viewportWidth <= 1000 ? teleradLogo : (isIntroPage && viewportWidth <= 1000 ? teleradLogoWhite : teleradLogo));

  // Navbar background color based on menu state and viewport width
  const navbarClassName = `fixed top-0 left-0 w-full ${isServicesPage ? 'navbar-services' : (isIntroPage && viewportWidth <= 1000 && isMenuBackgroundWhite ? 'navbar-white' : (isIntroPage ? 'navbar-transparent' : 'navbar-scrolled'))} z-50 transition-all duration-300`;

  return (
    <nav className={navbarClassName}>
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <div className="flex-1">
          <img src={logoSrc} alt="TeleRad Logo" className="h-8" />
        </div>
        <div className={`flex-1 flex items-center justify-end space-x-4`}>
          <button onClick={toggleMenu} className={`lg:hidden ${isServicesPage || (viewportWidth <= 1000 && isMenuBackgroundWhite) ? 'text-black' : (isIntroPage ? 'text-white' : 'text-black')} hover:text-black`}>
            {isMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
          <div className={`lg:flex lg:space-x-6 lg:items-center ${isMenuOpen ? 'flex flex-col items-center space-y-4 mt-4' : 'hidden'} ${language === 'ar' ? 'space-between-ar' : ''}`}>
            <button
              className={`no-underline hover:text-black ${isServicesPage || (viewportWidth <= 1000 && isMenuBackgroundWhite) ? 'text-black' : (isIntroPage ? 'text-white' : 'text-black')}`}
              onClick={() => handleNavigation('/', 'about')}
            >
              {t('navbar.about')}
            </button>
            <button
              className={`no-underline hover:text-black ${isServicesPage || (viewportWidth <= 1000 && isMenuBackgroundWhite) ? 'text-black' : (isIntroPage ? 'text-white' : 'text-black')}`}
              onClick={() => { navigate('/services'); setIsMenuOpen(false); }}
            >
              {t('navbar.services')}
            </button>
            <button
              className={`no-underline hover:text-black ${isServicesPage || (viewportWidth <= 1000 && isMenuBackgroundWhite) ? 'text-black' : (isIntroPage ? 'text-white' : 'text-black')}`}
              onClick={() => handleNavigation('/', 'consult')}
            >
              {t('navbar.consult')}
            </button>
            <button
              className={`no-underline hover:text-black ${isServicesPage || (viewportWidth <= 1000 && isMenuBackgroundWhite) ? 'text-black' : (isIntroPage ? 'text-white' : 'text-black')}`}
              onClick={() => handleNavigation('/', 'contact')}
            >
              {t('navbar.contact')}
            </button>
            <div className="ml-4 border border-gray-300 rounded p-1">
              <select value={language} onChange={handleLanguageChange} className="bg-transparent">
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
