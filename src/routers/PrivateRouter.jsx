import React, { useEffect, useState, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCookie } from '../helpers';
import { doGetInforUser } from '../redux/slice';
import { useLocation } from 'react-router-dom';

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
