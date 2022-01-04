import React, { useEffect, useState, useRef } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadGA, logout, setCookie } from '../helpers';
import { LOCAL_STORAGE_TOKEN } from '../constants';
import { doGetInforUser } from '../redux/slice';
import { useLocation } from 'react-router-dom';

export const AdminRouter = ({ component: Component, layout: Layout, exact, path, title }) => {
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
          return <Redirect to="/login-admin" />;
        }
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
