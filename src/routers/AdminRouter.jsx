import React, { useEffect, useState, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadGA, logout, setCookie } from '../helpers';
import { LOCAL_STORAGE_TOKEN } from '../constants';
import { doGetInforAdmin, doGetInforUser } from '../redux/slice';
import { useLocation } from 'react-router-dom';

export const AdminRouter = ({ component: Component, layout: Layout, exact, path, title }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(doGetInforAdmin());
  }, []);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (error?.message?.includes('401')) {
          logout(true);
          return <Redirect to="/auth/admin" />;
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
