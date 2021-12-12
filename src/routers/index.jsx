import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Auth,
  Courses,
  Home,
  Home2,
  ClassDetail,
  GradeTable,
  Invitation,
  Profile,
  Grades,
  ClassInfor,
  ClassMem
} from '../containers';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { BlankLayout, HeaderLayout } from '../layouts';
import { Header, HeaderClassDetail } from '../components/common';

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

        <PrivateRouter
          exact={true}
          path={'/course/:id'}
          component={ClassDetail}
          layout={HeaderLayout}
          header={<Header />}
        />
        <PrivateRouter
          exact={true}
          path={'/course/:id/infor'}
          component={ClassInfor}
          layout={HeaderLayout}
          header={<HeaderClassDetail val='infor'/>}
        />
        <PrivateRouter
          exact={true}
          path={'/course/:id/grade-table'}
          component={GradeTable}
          layout={HeaderLayout}
          header={<HeaderClassDetail val='grade-table'/>}
        />
        <PrivateRouter
          exact={true}
          path={'/course/:id/mem'}
          component={ClassMem}
          layout={HeaderLayout}
          header={<HeaderClassDetail val='mem'/>}
        />

        <PrivateRouter
          exact={true}
          path={'/courses/joinClassByLink'}
          component={Invitation}
          layout={BlankLayout}
          // header={<Header />}
        />

        <PrivateRouter
          exact={true}
          path={'/profile'}
          component={Profile}
          layout={HeaderLayout}
          header={<Header />}
        />

        <PublicRouter exact={true} path={'/auth'} component={Auth} layout={BlankLayout} />
        <PrivateRouter
          exact={true}
          path={'/grades/:id'}
          component={Grades}
          layout={BlankLayout}
          bgColor="#ffcccc"
          fullWidth
        />
      </Switch>
    </Router>
  );
};
