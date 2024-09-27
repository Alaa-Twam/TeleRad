import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import "./Intro.css";
import { ReactComponent as TeleradTypography } from "./telerad-typography.svg";

const Intro = ({ consultRef }) => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check if the current language is RTL
  const isRTL = i18n.dir() === 'rtl';

  const slides = [
    { img: "https://plus.unsplash.com/premium_photo-1683134707660-1cd3024bfbfb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: t('slides.0.title'), subtitle: t('slides.0.subtitle') },
    { img: "https://img.freepik.com/free-photo/doctors-reading-paper-hospital_23-2147767829.jpg", title: t('slides.1.title'), subtitle: t('slides.1.subtitle') },
    { img: "https://img.freepik.com/free-photo/doctor-examining-mri-scan-results-patient-computer-monitor-hospital_637285-490.jpg", title: t('slides.2.title'), subtitle: t('slides.2.subtitle') }
  ];

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToConsult = () => {
    if (consultRef && consultRef.current) {
      consultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    gsap.fromTo(
      "#Title",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 3, ease: "power2.out" }
    );
    gsap.fromTo(
      "#Slogan",
      { y: 250, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.3, ease: "power2.out" }
    );
  }, [currentSlide]);

  useEffect(() => {
    gsap.to("#telerad-svg", {
      rotation: 360,
      duration: 10,
      ease: "linear",
      repeat: -1
    });
  }, []);

  return (
    <div className={`intro-section ${isRTL ? 'rtl' : ''}`}>  {/* Add RTL class conditionally */}
      <div className="thumb">
        <div className="svg-container">
          <TeleradTypography id="telerad-svg" className="rotating-svg" />
        </div>
        <div className="slider-thumbnails">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentSlide ? "active" : ""}`}
              onClick={() => showSlide(index)}
            >
              <img src={slide.img} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="main-slider">
        <div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div className="slide" key={index}>
              <img src={slide.img} alt={`Slide ${index + 1}`} />
              <div className="slide-text">
                <h1 id="Title">{slide.title}</h1>
                <p id="Slogan">{slide.subtitle}</p>
                <button className="discover-more" onClick={scrollToConsult}>
                  {t('button')} {/* Button translation */}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-bar">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`bar-segment ${index === currentSlide ? "active" : ""}`}
              onClick={() => showSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intro;
