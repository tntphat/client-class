import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
export const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  homeIcon: {
    fontSize: '4rem',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    color: '#333',
    transition: 'all .2s linear',
    // color: theme.palette.text.main,
  },
  active: {
    backgroundColor: '#017df6',
    color: 'white',
    // color: theme.palette.navBar.main,
  },
}));

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';

export const DrawerData = [
  { id: 1, link: '/admin', name: 'Admins', icon: <AdminPanelSettingsIcon /> },
  { id: 2, link: '/admin/users', name: 'Users', icon: <SupervisorAccountIcon /> },
  {
    id: 3,
    link: '/admin/classes',
    name: 'Classes',
    icon: <SchoolIcon />,
  },
];
