import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Home, Home2 } from '../containers';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { BlankLayout, HeaderLayout } from '../layouts';
import { Header } from '../components/common';
import { ClassDetail } from '../containers/ClassDetail/ClassDetails';

// import { Header, Footer } from '../components';

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <PrivateRouter exact={true} path={'/'} component={Home} layout={BlankLayout} />
      </Switch>

      <Switch>
        <PrivateRouter
          exact={true}
          path={'/home'}
          component={Home}
          layout={HeaderLayout}
          header={<Header />}
        />
      </Switch>
      <Switch>
        <PrivateRouter
          exact={true}
          path={'/home2'}
          component={Home2}
          layout={HeaderLayout}
          header={<Header />}
        />
      </Switch>
      <Switch>
        <PrivateRouter
          exact={true}
          path={'/course/:id'}
          component={ClassDetail}
          layout={HeaderLayout}
          header={<Header />}
        />
      </Switch>
      <Switch>
        <PublicRouter exact={true} path={'/auth'} component={Auth} layout={BlankLayout} />
      </Switch>
    </Router>
  );
};
