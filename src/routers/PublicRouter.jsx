import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN } from '../constants';
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
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (token) {
          return <Redirect to="/" />;
        } else
          return (
            <Layout header={Header} footer={Footer} fullWidth={fullWidth} bgColor={bgColor}>
              <Component {...props} />
            </Layout>
          );
      }}
    />
  );
};
