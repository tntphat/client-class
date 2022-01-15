import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
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
  ClassMem,
  Admins,
  Users,
  Classes,
  ChangePass,
} from '../containers';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { AdminLayout, BlankLayout, HeaderLayout } from '../layouts';
import { Header, HeaderClassDetail } from '../components/common';
import { loadGA } from '../helpers';
import { useDispatch } from 'react-redux';
import { doPushGa } from '../redux/slice';
// import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GA from '../components/GA/GA';
import { AdminRouter } from './AdminRouter';

// import { Header, Footer } from '../components';

export const Routers = () => {
  return (
    <Router>
      <GA />
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
          header={<HeaderClassDetail val="infor" />}
        />
        <PrivateRouter
          exact={true}
          path={'/course/:id/grade-table'}
          component={GradeTable}
          layout={HeaderLayout}
          header={<HeaderClassDetail val="grade-table" />}
          fullWidth
        />
        <PrivateRouter
          exact={true}
          path={'/course/:id/mem'}
          component={ClassMem}
          layout={HeaderLayout}
          header={<HeaderClassDetail val="mem" />}
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

        <PrivateRouter
          exact={true}
          path={'/change-pass'}
          component={ChangePass}
          layout={HeaderLayout}
          header={<Header />}
        />

        <PublicRouter exact={false} path={'/auth'} component={Auth} layout={BlankLayout} />
        <PrivateRouter
          exact={true}
          path={'/grades/:id'}
          component={Grades}
          layout={BlankLayout}
          bgColor="#ffcccc"
          fullWidth
        />

        {/* Admin */}
        {/* <PublicRouter exact={true} path={'/admin/auth'} component={Auth} layout={BlankLayout} /> */}
        <AdminRouter exact={true} path={'/admin'} component={Admins} layout={AdminLayout} />
        <AdminRouter exact={true} path={'/admin/users'} component={Users} layout={AdminLayout} />
        <AdminRouter
          exact={true}
          path={'/admin/classes'}
          component={Classes}
          layout={AdminLayout}
        />
      </Switch>
    </Router>
  );
};
