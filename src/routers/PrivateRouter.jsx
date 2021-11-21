import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCookie } from '../helpers';
import { LOCAL_STORAGE_TOKEN } from '../constants';
import { doGetInforUser } from '../redux/slice';

export const PrivateRouter = ({
  component: Component,
  layout: Layout,
  header: Header,
  footer: Footer,
  exact,
  path,
  title,
  fullWidth,
}) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(doGetInforUser());
  }, []);
  console.log('error: ', error);
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (error) {
          logout();
          return <Redirect to="/" />;
        }
        return (
          <Layout fullWidth={fullWidth} title={title} header={Header} footer={Footer}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
