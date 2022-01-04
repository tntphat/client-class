import React, { useEffect, useState, useRef } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadGA, logout, setCookie } from '../helpers';
import { LOCAL_STORAGE_TOKEN } from '../constants';
import { doGetInforUser } from '../redux/slice';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

export const PrivateRouter = ({
  component: Component,
  layout: Layout,
  header: Header,
  footer: Footer,
  exact,
  path,
  title,
  fullWidth,
  bgColor,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(doGetInforUser());
  }, []);

  const [ga, setGa] = useState(null);
  const refGa = useRef(null);
  // const location = useLocation();
  useEffect(() => {
    // loadGA((ga) => {
    //   console.log('ga in cb: ', ga);
    //   setGa(() => ga);
    //   refGa.current = ga;
    // });
  }, []);

  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, [location.pathname]);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (error) {
          logout();
          return <Redirect to="/auth" />;
        }
        return (
          <Layout
            fullWidth={fullWidth}
            title={title}
            header={Header}
            footer={Footer}
            bgColor={bgColor}
          >
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
