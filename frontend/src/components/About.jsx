import React from 'react';
import { useTranslation } from "react-i18next";  // Import useTranslation
import './About.css';

const About = ({ onGetToKnowUsClick }) => {
  const { t, i18n } = useTranslation();
    // Check if the current language is RTL
  const isRTL = i18n.dir() === 'rtl';

  return (
    <div className={`about-container ${isRTL ? 'rtl' : ''} flex flex-col md:flex-row h-screen bg-gray-100`}>
      <div className="about-image flex-1 overflow-hidden relative">
        <div className="image-container relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1666214280577-5f90bc36be92?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us"
            className="image w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="about-content flex-1 flex flex-col justify-center p-5 md:pl-20">
        <h1 className="about-title text-4xl md:text-5xl font-bold mb-5">{t('about.title')}</h1>
        <p className="about-paragraph text-base md:text-lg mb-10">{t('about.paragraph')}</p>
        <button
          onClick={onGetToKnowUsClick}
          className="get-to-know-us flex items-center justify-between bg-gray-200 p-4 md:p-5 w-full md:w-auto absolute bottom-0 md:left-0 z-10"
        >
          <span className="button-text text-base md:text-lg">{t('about.button')}</span>
          <span className="plus-sign text-xl md:text-2xl ml-2">+</span>
        </button>
      </div>
    </div>
  );
};

export default About;
