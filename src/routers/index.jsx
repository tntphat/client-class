import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Courses, Home, Home2, ClassDetail, Invitation } from '../containers';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { BlankLayout, HeaderLayout } from '../layouts';
import { Header } from '../components/common';

// import { Header, Footer } from '../components';

export const Routers = () => {
  return (
    <Router>
      <Switch>
        {/* <PublicRouter exact={true} path={'/'} component={Home} layout={BlankLayout} /> */}

        <PrivateRouter
          exact={true}
          path={'/home'}
          component={Home}
          layout={HeaderLayout}
          header={<Header />}
        />

        <PrivateRouter
          exact={true}
          path={'/'}
          component={Courses}
          layout={HeaderLayout}
          fullWidth={true}
          header={<Header />}
        />

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
        <PrivateRouter
          exact={true}
          path={'/invitation'}
          component={Invitation}
          layout={BlankLayout}
          // header={<Header />}
        />

        <PublicRouter exact={true} path={'/auth'} component={Auth} layout={BlankLayout} />
      </Switch>
    </Router>
  );
};
