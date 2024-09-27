import React, { useState } from 'react';
import './ServicesPage.css';
import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
    const { t } = useTranslation(); // Hook to use translations
    const [activeService, setActiveService] = useState('Teleradiology Reporting');

    const servicesData = {
        'Teleradiology Reporting': {
            title: t('servicesP.data.Teleradiology Reporting.title'),
            brief: t('servicesP.data.Teleradiology Reporting.brief'),
            image: 'https://img.freepik.com/free-photo/medium-shot-smiley-nurse-ct-scan-room_23-2149341550.jpg',
            additionalInfo: t('servicesP.data.Teleradiology Reporting.additionalInfo')
        },
        'Consultation Services': {
            title: t('servicesP.data.Consultation Services.title'),
            brief: t('servicesP.data.Consultation Services.brief'),
            image: 'https://img.freepik.com/free-photo/doctor-discussing-x-ray-with-patient_1170-2102.jpg',
            additionalInfo: t('servicesP.data.Consultation Services.additionalInfo')
        },
        'Second Opinions': {
            title: t('servicesP.data.Second Opinions.title'),
            brief: t('servicesP.data.Second Opinions.brief'),
            image: 'https://img.freepik.com/free-photo/general-practitioner-presenting-x-ray-neck-pediatrician-specialist-with-protection-mask-providing-health-care-services-radiographic-treatment-examination-coronavirus-hospital-cabinet_482257-14506.jpg',
            additionalInfo: t('servicesP.data.Second Opinions.additionalInfo')
        }
    };

    const currentService = servicesData[activeService];

    return (
        <section className="services-page">
            {/* Left Section - Rotated Title */}
            <div className="services-title2">
                <h1>{t('servicesP.title')}</h1>
            </div>

            <div className="services-content">
                {/* Title Section with Green Background */}
                <div className="services-header-section">
                    <h1 className="services-header">{currentService.title}</h1>
                    <p className="services-description">
                        {currentService.brief}
                    </p>
                </div>

                {/* Service Navigation Tabs and Content */}
                <div className="services-body-section">
                    <div className="services-tabs">
                        <ul>
                            {Object.keys(servicesData).map(service => (
                                <li 
                                    key={service} 
                                    className={service === activeService ? 'active' : ''} 
                                    onClick={() => setActiveService(service)}
                                >
                                    {t(`servicesP.data.${service}.title`)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image and Additional Info */}
                    <div className="services-image-placeholder">
                        <img src={currentService.image} alt={currentService.title} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <p className="services-additional-info">{currentService.additionalInfo}</p>
                </div>
            </div>
        </section>
    );
};

export default ServicesPage;
