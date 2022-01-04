import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';
ReactGA.initialize('UA-216010316-1');

const GA = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location.pathname]);
  return null;
};

export default GA;
