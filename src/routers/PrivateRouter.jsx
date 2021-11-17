import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

export const PrivateRouter = ({
  component: Component,
  layout: Layout,
  header: Header,
  footer: Footer,
  exact,
  path,
  title,
}) => {
  useEffect(() => {
    // dispatch(doGetCurrentUser());
  }, []);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <Layout title={title} header={Header} footer={Footer}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
