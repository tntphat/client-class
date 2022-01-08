import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_TOKEN_ADMIN } from '../constants';
import { readCookie } from '../helpers';

export const PublicRouter = ({
  component: Component,
  layout: Layout,
  header: Header,
  footer: Footer,
  exact,
  path,
  fullWidth,
  bgColor,
}) => {
  const token = readCookie(LOCAL_STORAGE_TOKEN);
  const tokenAdmin = readCookie(LOCAL_STORAGE_TOKEN_ADMIN);
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        // if (tokenAdmin) return <Redirect to="/admin" />;
        // if (token) {
        //   return <Redirect to="/" />;
        // }
        return (
          <Layout header={Header} footer={Footer} fullWidth={fullWidth} bgColor={bgColor}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
