import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Home, Home2 } from '../containers';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { BlankLayout, HeaderLayout } from '../layouts';
import { Header } from '../components/common';

// import { Header, Footer } from '../components';

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <PublicRouter exact={true} path={'/'} component={Home} layout={BlankLayout} />

        <PrivateRouter
          exact={true}
          path={'/home'}
          component={Home}
          layout={HeaderLayout}
          header={<Header />}
        />

        <PrivateRouter
          exact={true}
          path={'/home2'}
          component={Home2}
          layout={HeaderLayout}
          header={<Header />}
        />

        <PublicRouter exact={true} path={'/auth'} component={Auth} layout={BlankLayout} />
      </Switch>
    </Router>
  );
};
