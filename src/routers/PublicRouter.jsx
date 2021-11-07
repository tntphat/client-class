import React from 'react';
import { Route } from 'react-router-dom';

export const PublicRouter = ({
  component: Component,
  layout: Layout,
  header: Header,
  footer: Footer,
  exact,
  path,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <Layout header={Header} footer={Footer}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
