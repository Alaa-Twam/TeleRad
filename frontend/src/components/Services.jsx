import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './Services.css';
import teleradIcon from './telerad-icon.svg';

const Services = ({ onHowItWorksClick }) => {
  const { t } = useTranslation();  // Use useTranslation hook

  return (
    <div className="services-container">
      <div className="services-title">
        <h1>{t('services.title').split('<br />').map((line, index) => (
          <React.Fragment key={index}>
            {line} <br />
          </React.Fragment>
        ))}</h1>
        <Link to="/services" className="explore-more-button">
          {t('services.exploreMore')}
        </Link>
        <button
          onClick={onHowItWorksClick}
          className="get-to-know-us2"
        >
          <span className="button-text">{t('services.howItWorks')}</span>
          <span className="plus-sign2">+</span>
        </button>
      </div>
      <div className="services-image-container">
        <div className="services-image">
          <img
            src="https://elifeclinics.com/wp-content/uploads/2023/03/doctor-looking-ct-scan.jpg"
            alt="Placeholder"
            className="background-image"
          />
        </div>
        <div className="services-list">
          <div className="service-item">
            <img src={teleradIcon} alt="Service Icon" className="service-icon" />
            <div className="service-description">
              <h1>{t('services.teleradiology.title')}</h1>
              <p>{t('services.teleradiology.description')}</p>
            </div>
          </div>
          <div className="service-item">
            <img src={teleradIcon} alt="Service Icon" className="service-icon" />
            <div className="service-description">
              <h1>{t('services.consultation.title')}</h1>
              <p>{t('services.consultation.description')}</p>
            </div>
          </div>
          <div className="service-item">
            <img src={teleradIcon} alt="Service Icon" className="service-icon" />
            <div className="service-description">
              <h1>{t('services.secondOpinion.title')}</h1>
              <p>{t('services.secondOpinion.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
