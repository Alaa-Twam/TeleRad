import React, { useState, useEffect, forwardRef } from 'react';
import './Consult.css';
import { useTranslation } from 'react-i18next';

const Consult = forwardRef((props, ref) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [medicalCentreCustomerType, setMedicalCentreCustomerType] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [timerActive, setTimerActive] = useState(false);

  const [confirmationCountdown, setConfirmationCountdown] = useState(10); // for step 10

  useEffect(() => {
    if (selectedOption === 'medical-centre' && step === 11 && medicalCentreCustomerType === 'new') {
      setTimerActive(true);
      setConfirmationCountdown(10); // Reset countdown
    } else {
      setTimerActive(false);
    }
  }, [selectedOption, step, medicalCentreCustomerType]);

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setConfirmationCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setMedicalCentreCustomerType('existing');
            setStep(8); // Redirect to Reference Code step
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerActive]);


  const nextStep = () => {
    if (step === 1 && selectedOption === 'individual') {
      setStep(2);
    } else if (step === 1 && selectedOption === 'medical-centre') {
      setStep(7); // Move to step 7 for Medical Centre
    } else if (step === 2 && selectedOption === 'individual') {
      setStep(3);
    } else if (step === 3 && selectedOption === 'individual' && selectedService !== null) {
      setStep(4);
    } else if (step === 4 && selectedOption === 'individual' && (file || fileLink)) {
      setStep(5);
    } else if (step === 5 && selectedOption === 'individual') {
      setStep(6);
    } else if (step === 6 && selectedOption === 'individual') {
      setStep(7);
    } else if (step === 7 && selectedOption === 'medical-centre' && medicalCentreCustomerType !== null) {
      setStep(8); // Proceed to the next step after selecting customer type for Medical Centre
    } else if (step === 8 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new') {
      setStep(9); // Move to step 9 for new Medical Centre
    } else if (step === 8 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing') {
      setStep(9); // Move to step 9 for existing Medical Centre
    } else if (step === 9 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new') {
      setStep(10); // Move to step 10 for new Medical Centre
    } else if (step === 9 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing' && selectedService !== null) {
      setStep(10); // Only move to step 10 if a service is selected for existing Medical Centre
    } else if (step === 10 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new') {
      setStep(11); // Move to step 11 for new Medical Centre
    }
       else if (step === 10 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing') {
      setStep(11); // Move to step 11 for existing Medical Centre
    } 
    else if (step === 11 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new') {
        setStep(12);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      if (selectedOption === 'medical-centre') {
        if (step > 7) {
          setStep(step - 1);
        } else if (step === 7) {
          setStep(1); // Go back to the initial step when in Medical Centre and at step 7
          setSelectedOption(null);
        }
      } else {
        setStep(step - 1);
      }
    }
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    // Reset steps and selected values if option changes
    setStep(1);
    setSelectedService(null);
    setFile(null);
    setFileName('');
    setFileLink('');
    setUploadProgress(0);
    setMedicalCentreCustomerType(null);
    setConfirmationCountdown(10);
  };

  const selectService = (service) => {
    setSelectedService(service);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const handleLinkChange = (event) => {
    setFileLink(event.target.value);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };
  

  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return selectedOption === null;
      case 2:
        return selectedOption === 'individual' ? false : medicalCentreCustomerType === null;
      case 3:
        return selectedOption === 'individual' && selectedService === null;
      case 4:
        return selectedOption === 'individual' && !(file || fileLink);
      case 5:
        return selectedOption === 'individual';
      case 8:
        return selectedOption === 'medical-centre' && medicalCentreCustomerType === null;
      case 9:
        if (selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new') {
          return selectedPlan === null;
        }
        if (selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing') {
          return selectedService === null;
        }
        return false;
      default:
        return false;
    }
  };

  const { t } = useTranslation();

  return (
    <div ref={ref} className="consult-container">
<div className="consult-left">
      <h1 className="consult-title" dangerouslySetInnerHTML={{ __html: t('consult.title') }}></h1>
      <p className="consult-subtitle">{t('consult.subtitle')}</p>

      <div className="consult-step-counter">
        {step === 1 && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step1.brief')}</p>
            <span className="step-number">{t('consult.steps.step1.number')}</span>
          </div>
        )}

        {step === 2 && selectedOption === 'individual' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step2_individual.brief')}</p>
            <span className="step-number">{t('consult.steps.step2_individual.number')}</span>
          </div>
        )}

        {step === 3 && selectedOption === 'individual' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step3_individual.brief')}</p>
            <span className="step-number">{t('consult.steps.step3_individual.number')}</span>
          </div>
        )}

        {step === 4 && selectedOption === 'individual' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step4_individual.brief')}</p>
            <span className="step-number">{t('consult.steps.step4_individual.number')}</span>
          </div>
        )}

        {step === 5 && selectedOption === 'individual' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step5_individual.brief')}</p>
            <span className="step-number">{t('consult.steps.step5_individual.number')}</span>
          </div>
        )}

        {step === 6 && selectedOption === 'individual' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step6_individual.brief')}</p>
            <span className="step-number">{t('consult.steps.step6_individual.number')}</span>
          </div>
        )}

        {step === 7 && selectedOption === 'medical-centre' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step2_medical_centre.brief')}</p>
            <span className="step-number">{t('consult.steps.step2_medical_centre.number')}</span>
          </div>
        )}

        {step === 8 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step3_medical_centre_new.brief')}</p>
            <span className="step-number">{t('consult.steps.step3_medical_centre_new.number')}</span>
          </div>
        )}

        {step === 8 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step3_medical_centre_existing.brief')}</p>
            <span className="step-number">{t('consult.steps.step3_medical_centre_existing.number')}</span>
          </div>
        )}

        {step === 9 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step4_medical_centre_new.brief')}</p>
            <span className="step-number">{t('consult.steps.step4_medical_centre_new.number')}</span>
          </div>
        )}

        {step === 9 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step4_medical_centre_existing.brief')}</p>
            <span className="step-number">{t('consult.steps.step4_medical_centre_existing.number')}</span>
          </div>
        )}

        {step === 10 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'new' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step5_medical_centre_new.brief')}</p>
            <span className="step-number">{t('consult.steps.step5_medical_centre_new.number')}</span>
          </div>
        )}

        {step === 10 && selectedOption === 'medical-centre' && medicalCentreCustomerType === 'existing' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step6_medical_centre_existing.brief')}</p>
            <span className="step-number">{t('consult.steps.step6_medical_centre_existing.number')}</span>
          </div>
        )}

        {step === 11 && selectedOption === 'medical-centre' && (
          <div className="step-box">
            <p className="step-brief">{t('consult.steps.step7_medical_centre_existing.brief')}</p>
            <span className="step-number">{t('consult.steps.step7_medical_centre_existing.number')}</span>
          </div>
        )}
      </div>
    </div>
      <div className="consult-right">
        {step === 1 && (
          <div className="consult-step consult-step1">
            <button
              className={`consult-option ${selectedOption === 'individual' ? 'selected' : ''}`}
              onClick={() => selectOption('individual')}
            >
              <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-6/icon_-individual.png" alt="Individual" />
              <p>{t('consult.option.individual.title')}</p>
            </button>
            <button
              className={`consult-option ${selectedOption === 'medical-centre' ? 'selected' : ''}`}
              onClick={() => selectOption('medical-centre')}
            >
              <img src="https://cdn-icons-png.flaticon.com/512/5572/5572281.png" alt="Medical Centre" />
              <p>{t('consult.option.MedicalCentre.title')}</p>
            </button>
          </div>
        )}

        {selectedOption === 'individual' && step === 2 && (
          <div className="consult-step consult-step2">
            <input type="text" placeholder={t('consult.option.individual.fullname')} />
            <input type="date" placeholder={t('consult.option.individual.dob')} />
            <input type="text" placeholder={t('consult.option.individual.mobile')} />
            <input type="email" placeholder={t('consult.option.individual.email')} />
            <select>
              <option>{t('consult.option.individual.gender')}</option>
              <option>{t('consult.option.individual.male')}</option>
              <option>{t('consult.option.individual.female')}</option>
            </select>
          </div>
        )}

        {selectedOption === 'individual' && step === 3 && (
          <div className="consult-step consult-step3">
            <p>{t('consult.option.individual.individual-service')}</p>
            <button onClick={() => selectService('CT scan single part')}>{t('consult.option.individual.CT1')}</button>
    <button onClick={() => selectService('CT scan whole body')}>{t('consult.option.individual.CT2')}</button>
    <button onClick={() => selectService('MRI single part')}>{t('consult.option.individual.MRI')}</button>
    <button onClick={() => selectService('X-ray')}>{t('consult.option.individual.Xray')}</button>
    <button onClick={() => selectService('Mammogram')}>{t('consult.option.individual.mammogram')}</button>
    <button onClick={() => selectService('PET scan')}>{t('consult.option.individual.PET')}</button>
          </div>
        )}

        {selectedOption === 'individual' && step === 4 && (
          <div className="consult-step consult-step4">
            <div className="upload-section">
              <h3>{t('consult.option.individual.upload')}</h3>
              <i className="upload-icon">☁️</i>
              <input
                type="file"
                onChange={handleFileUpload}
                className="file-input"
              />
              <input
                type="text"
                placeholder={t('consult.option.individual.link')}
                value={fileLink}
                onChange={handleLinkChange}
                className="link-input"
              />
              {file && (
                <div className="file-info">
                  <p>{t('consult.option.individual.uploaded')} {fileName}</p>
                  <progress value={uploadProgress} max="100"></progress>
                </div>
              )}
              {fileLink && (
                <div className="file-info">
                  <p>{t('consult.option.individual.provided')}<a href={fileLink} target="_blank" rel="noopener noreferrer">{fileLink}</a></p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedOption === 'individual' && step === 5 && (
          <div className="consult-step consult-step5">
            <h2 className="consult-plan-title">{t('consult.option.individual.plantitle')}</h2>
            <p>{t('consult.option.individual.plantitlep1')}<span className="highlight">{t('consult.option.individual.planservice')}</span></p>
            <p>{t('consult.option.individual.plantitlep2')}</p>
            <div className="consult-summary">
              <p>{t('consult.option.individual.amount')}<span>$29.00</span></p>
            </div>
            <button className="proceed-button" onClick={nextStep}>{t('consult.option.individual.proceed')}</button>
          </div>
        )}

        {step === 6 && selectedOption === 'individual' && (
          <div className="consult-step consult-step6">
            <div className="payment-container">
              <div className="payment-option">
                <input
                  type="radio"
                  id="debit-credit"
                  name="payment-method"
                  checked
                />
                <label htmlFor="debit-credit">
                {t('consult.option.individual.card')}
                  <div className="card-icons">
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" />
                  </div>
                </label>
              </div>

              <div className="card-section">
                <label htmlFor="card-number">{t('consult.option.individual.cardnumber')}</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />

                <div className="separator"></div>

                <div className="card-details">
                  <div>
                    <label htmlFor="expiry-date">{t('consult.option.individual.carddate')}</label>
                    <input type="text" id="expiry-date" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label htmlFor="cvc">CVC</label>
                    <input type="text" id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>

              <button className="submit-button">{t('consult.option.individual.pay')}</button>
            </div>
          </div>
        )}

        {selectedOption === 'medical-centre' && step === 7 && (
          <div className="consult-step consult-step7">
            <button
              className={`consult-option ${medicalCentreCustomerType === 'new' ? 'selected' : ''}`}
              onClick={() => setMedicalCentreCustomerType('new')}
            >
              {t('consult.option.MedicalCentre.newCustomer')}
            </button>
            <button
              className={`consult-option ${medicalCentreCustomerType === 'existing' ? 'selected' : ''}`}
              onClick={() => setMedicalCentreCustomerType('existing')}
            >
              {t('consult.option.MedicalCentre.existingCustomer')}
            </button>
          </div>
        )}

        {selectedOption === 'medical-centre' && step === 8 && medicalCentreCustomerType === 'new' && (
          <div className="consult-step consult-step8">
            <input type="text" placeholder={t('consult.option.MedicalCentre.name')} />
            <input type="text" placeholder={t('consult.option.MedicalCentre.contactPerson')} />
            <input type="text" placeholder={t('consult.option.MedicalCentre.mobile')} />
            <input type="email" placeholder={t('consult.option.MedicalCentre.email')} />
          </div>
        )}

{selectedOption === 'medical-centre' && step === 8 && medicalCentreCustomerType === 'existing' && (
          <div className="consult-step consult-step8">
            <p>{t('consult.option.MedicalCentre.RefCode')}</p>
            <input type="text" placeholder={t('consult.option.MedicalCentre.Code')} />
          </div>
        )}

{selectedOption === 'medical-centre' && step === 9 && medicalCentreCustomerType === 'new' && (
  <div className="consult-step consult-step9">
    <button
      className={`consult-option ${selectedPlan === 'Plan A' ? 'selected' : ''}`}
      onClick={() => handlePlanSelection('Plan A')}
    >
      {t('consult.option.MedicalCentre.planA')}
      <p className='plan-brief'>{t('consult.option.MedicalCentre.planAbrief')}</p>
      <p className='plan-price'>{t('consult.option.MedicalCentre.planAprice')}</p>
    </button>
   
    <button
      className={`consult-option ${selectedPlan === 'Plan B' ? 'selected' : ''}`}
      onClick={() => handlePlanSelection('Plan B')}
    >
      {t('consult.option.MedicalCentre.planB')}
      <p className='plan-brief'>{t('consult.option.MedicalCentre.planBbrief')}</p>
      <p className='plan-price'>{t('consult.option.MedicalCentre.planBprice')}</p>
    </button>
    <button
      className={`consult-option ${selectedPlan === 'Plan C' ? 'selected' : ''}`}
      onClick={() => handlePlanSelection('Plan C')}
    >
      {t('consult.option.MedicalCentre.planC')}
      <p className='plan-brief'>{t('consult.option.MedicalCentre.planCbrief')}</p>
      <p className='plan-price'>{t('consult.option.MedicalCentre.planCprice')}</p>
    </button>
  </div>
)}


{selectedOption === 'medical-centre' && step === 9 && medicalCentreCustomerType === 'existing' && (
  <div className="consult-step consult-step9-existing">
    <p>{t('consult.option.MedicalCentre.select')}</p>
    <button onClick={() => selectService('CT scan single part')}>{t('consult.option.individual.CT1')}</button>
    <button onClick={() => selectService('CT scan whole body')}>{t('consult.option.individual.CT2')}</button>
    <button onClick={() => selectService('MRI single part')}>{t('consult.option.individual.MRI')}</button>
    <button onClick={() => selectService('X-ray')}>{t('consult.option.individual.Xray')}</button>
    <button onClick={() => selectService('Mammogram')}>{t('consult.option.individual.mammogram')}</button>
    <button onClick={() => selectService('PET scan')}>{t('consult.option.individual.PET')}</button>
    {/* Add more services as needed */}
  </div>
)}


{selectedOption === 'medical-centre' && step === 10 && medicalCentreCustomerType === 'new' && (
  <div className="consult-step consult-step10-payment">
    <div className="payment-container">
      <div className="payment-option">
        <input
          type="radio"
          id="debit-credit"
          name="payment-method"
          checked
        />
        <label htmlFor="debit-credit">
        {t('consult.option.individual.card')}
          <div className="card-icons">

            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="VISA" />
          </div>
        </label>
      </div>

      <div className="card-section">
        <label htmlFor="card-number">{t('consult.option.individual.cardnumber')}</label>
        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />

        <div className="separator"></div>

        <div className="card-details">
          <div>
            <label htmlFor="expiry-date">{t('consult.option.individual.carddate')}</label>
            <input type="text" id="expiry-date" placeholder="MM/YY" />
          </div>
          <div>
            <label htmlFor="cvc">CVC</label>
            <input type="text" id="cvc" placeholder="123" />
          </div>
        </div>

        <button className="submit-button" onClick={nextStep}>{t('consult.option.individual.pay')}</button>
      </div>
    </div>
  </div>
)}


{selectedOption === 'medical-centre' && step === 11 && medicalCentreCustomerType === 'new' && (
        <div className="consult-step consult-step11">
          <p>{t('consult.option.MedicalCentre.confirm')}</p>
          <p>{t('consult.option.MedicalCentre.confirmp1')}</p>
          <p>{t('consult.option.MedicalCentre.confirmp2')} {confirmationCountdown}</p>
        </div>
      )}



{selectedOption === 'medical-centre' && step === 10 && medicalCentreCustomerType === 'existing' && (
  <div className="consult-step consult-step10">
    {t('consult.option.individual.upload')}
    <input type="file" onChange={handleFileUpload} />
    <input type="text" placeholder={t('consult.option.individual.fileLink')} value={fileLink} onChange={handleLinkChange} />
    {file && <p className="file-info">{t('consult.option.individual.uploaded')} {fileName}</p>}
    {fileLink && <p className="file-info">{t('consult.option.individual.provided')} {fileLink}</p>}
  </div>
)}





        <div className="consult-navigation">
          <button className="nav-button back-button" onClick={prevStep}>{t('consult.Back')}</button>
          <button
            className="nav-button next-button"
            onClick={nextStep}
            disabled={isNextButtonDisabled()}
          >
            {t('consult.Next')}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Consult;
