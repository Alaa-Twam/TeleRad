import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import logo from './telerad-logo.svg';
import { useTranslation } from 'react-i18next'; // Assuming you're using react-i18next for translation

const Footer = () => {
    const { t, i18n } = useTranslation(); // Translation hook
    const isRTL = i18n.dir() === 'rtl';

  
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer-container ${isRTL ? 'rtl' : ''}`}>
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt={t('footer.title.part1')} className="footer-logo-large" />
          <h2 className="footer-title-large">
            <span>{t('footer.title.part1')}</span>
            <span>{t('footer.title.part2')}</span>
            <span>{t('footer.title.part3')}</span>
            <span>{t('footer.title.part4')}</span>
          </h2>
          <div className="footer-contact">
            <p><FontAwesomeIcon icon={faPhone} className="footer-icon" /> {t('footer.contact.phone')}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="footer-icon" /> {t('footer.contact.email')}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" /> {t('footer.contact.address')}</p>
          </div>
          <div className="footer-social">
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faXTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faLinkedinIn} />
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-menu">
            <ul className="footer-list">
              <li>{t('footer.menu.home')}</li>
              <li>{t('footer.menu.aboutUs')}</li>
              <li>{t('footer.menu.ourVision')}</li>
              <li>{t('footer.menu.ourMission')}</li>
              <li>{t('footer.menu.ourTeam')}</li>
              <li>{t('footer.menu.contact')}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer.footerText', { year: currentYear })}</p>
      </div>
    </footer>
  );
};

export default Footer;
