import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './How.css';

const How = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="how-wrapper">
      <div className="how-container">
        <div className="how-column">
          <div className="how-image">
            <img 
              src="https://drfischerspinesurgeon.com/wp-content/uploads/2021/03/Can-Arthritis-Occur-in-Your-Back.jpg" 
              alt="Placeholder" 
            />
            <div className="how-number">1</div>
          </div>
          <h3 className="how-title">{t('how.shareTitle')}</h3> {/* Translated Title */}
          <p className="how-paragraph">{t('how.shareDescription')}</p> {/* Translated Paragraph */}
        </div>
        <div className="how-column middle">
          <div className="how-image">
            <img 
              src="https://img.freepik.com/free-photo/medium-shot-doctor-nurse-looking-radiography_23-2149310018.jpg" 
              alt="Placeholder" 
            />
            <div className="how-number">2</div>
          </div>
          <h3 className="how-title">{t('how.expertTitle')}</h3> {/* Translated Title */}
          <p className="how-paragraph">{t('how.expertDescription')}</p> {/* Translated Paragraph */}
        </div>
        <div className="how-column">
          <div className="how-image">
            <img 
              src="https://previews.123rf.com/images/armmypicca/armmypicca2311/armmypicca231105757/229460671-%C3%A9quipe-multiraciale-de-m%C3%A9decins-discutant-d-un-patient-debout-regroup%C3%A9-dans-le-hall-regardant-une.jpg" 
              alt="Placeholder" 
            />
            <div className="how-number">3</div>
          </div>
          <h3 className="how-title">{t('how.receiveTitle')}</h3> {/* Translated Title */}
          <p className="how-paragraph">{t('how.receiveDescription')}</p> {/* Translated Paragraph */}
        </div>
      </div>
      <div className="how-button-container">
        <button className="how-button">{t('how.consultButton')}</button> {/* Translated Button */}
      </div>
    </div>
  );
};

export default How;
