import React from 'react';
import { useLocation } from 'react-router-dom';

const withIntroPageStatus = (WrappedComponent) => {
  return (props) => {
    const location = useLocation();
    const isIntroPage = location.pathname === '/';
    return <WrappedComponent isIntroPage={isIntroPage} {...props} />;
  };
};

export default withIntroPageStatus;
