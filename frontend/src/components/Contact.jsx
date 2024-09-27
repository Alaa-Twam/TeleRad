import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import contactImage from './contact.png';
import { useTranslation } from 'react-i18next'; // Assuming you're using react-i18next for translation

const Contact = () => {
    const { t, i18n } = useTranslation(); // Translation hook
    const isRTL = i18n.dir() === 'rtl';

  return (
    <div className={`contact-container ${isRTL ? 'rtl' : ''}`}>
      <div className="contact-content flex flex-col md:flex-row">
        <div className="contact-info md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">{t('contact.title')}</h2>
          <p className="text-lg text-gray-700">
            {t('contact.description')}
          </p>
        </div>
        <div className="contact-details md:w-1/2 bg-green-500 p-8 flex flex-col justify-center">
          <div className="contact-info-details mb-8">
            <p className="flex items-center text-lg text-white mb-4">
              <FontAwesomeIcon icon={faPhone} className="mr-2 ml-4" /> {t('contact.phone')}
            </p>
            <p className="flex items-center text-lg text-white mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 ml-4" /> {t('contact.email')}
            </p>
            <p className="flex items-center text-lg text-white mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 ml-4" /> {t('contact.address')}
            </p>
          </div>
          <div className="social-icons">
            <p className="text-lg font-bold mb-2 text-white">{t('contact.followUs')}</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" aria-label="X">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="#" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img
          src={contactImage}
          alt={t('contact.title')}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Contact;
