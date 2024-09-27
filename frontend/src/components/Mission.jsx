import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './Mission.css';

const Mission = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to 0 so the first item is active
  const { t } = useTranslation(); // Initialize the translation hook

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="mission-container">
      <div className="accordion">
        <div 
          className={`accordion-item ${activeIndex === 0 ? 'active' : ''}`} 
          style={{ backgroundColor: '#f2f2f2' }}
          onClick={() => handleAccordionClick(0)}
        >
          <div className="accordion-header">
            <h2 className="accordion-number">01</h2>
            {activeIndex === 0 && (
              <div className="accordion-header-content">
                <h3 className="accordion-title">{t('mission.visionTitle')}</h3> {/* Translated Title */}
                <span className="plus-sign">+</span>
              </div>
            )}
          </div>
          {activeIndex === 0 && (
            <div className="accordion-content">
              <p>{t('mission.visionContent')}</p> {/* Translated Content */}
            </div>
          )}
        </div>

        <div 
          className={`accordion-item ${activeIndex === 1 ? 'active' : ''}`} 
          style={{ backgroundColor: '#05CC98' }}
          onClick={() => handleAccordionClick(1)}
        >
          <div className="accordion-header">
            <h2 className="accordion-number">02</h2>
            {activeIndex === 1 && (
              <div className="accordion-header-content">
                <h3 className="accordion-title">{t('mission.missionTitle')}</h3> {/* Translated Title */}
                <span className="plus-sign">+</span>
              </div>
            )}
          </div>
          {activeIndex === 1 && (
            <div className="accordion-content">
              <p>{t('mission.missionContent')}</p> {/* Translated Content */}
            </div>
          )}
        </div>

        <div 
          className={`accordion-item ${activeIndex === 2 ? 'active' : ''}`} 
          style={{ backgroundColor: '#0E8E69' }}
          onClick={() => handleAccordionClick(2)}
        >
          <div className="accordion-header">
            <h2 className="accordion-number">03</h2>
            {activeIndex === 2 && (
              <div className="accordion-header-content">
                <h3 className="accordion-title">{t('mission.valuesTitle')}</h3> {/* Translated Title */}
                <span className="plus-sign">+</span>
              </div>
            )}
          </div>
          {activeIndex === 2 && (
            <div className="accordion-content">
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
      {t('mission.valuesContent', { returnObjects: true }).map((value, index) => (
        <li key={index} style={{ marginBottom: '10px' }}>{value}</li>
      ))}
    </ul>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Image Section */}
      <div className="fixed-image-container">
        <img 
          src="https://plus.unsplash.com/premium_photo-1661405466370-d6d3d47825cb?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Placeholder" 
          className="fixed-image"
        />
      </div>
    </div>
  );
};

export default Mission;
