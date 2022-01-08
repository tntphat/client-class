import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import { Navbar, DrawerRespon } from '../../components/Admin';
import { useStyles, styles } from './AdminLayout.style';
import { useSelector } from 'react-redux';
import { ModalLoading } from '../../components/common';

function AdminPage({ children }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const { isLoading } = useSelector((state) => state.admin);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        // setOpenPopup={setOpenPopup}
        // user={selectCurrentEmployee}
        position="absolute"
        className={`${classes.appBar}  ${open && classes.appBarShift} `}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        open={open}
      ></Navbar>

      <DrawerRespon
        classes={classes}
        handleDrawerToggle={handleDrawerToggle}
        open={open}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      {isLoading ? <ModalLoading /> : null}
    </div>
  );
}

export const AdminLayout = withStyles(styles)(withRouter(AdminPage));
