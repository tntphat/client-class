import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from './Header.styles';
import { useSelector } from 'react-redux';
import { logout } from '../../../helpers/auth';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { MenuComp } from '../../common';
import { useDispatch } from 'react-redux';
import { doMarkReadedAll } from '../../../redux/slice';
export const Header = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch;
  const { user, isLoading } = useSelector((state) => state.user);
  const { listNotifications } = useSelector((state) => state.notification);
  const history = useHistory();
  const handleNavigateProfile = () => {
    history.push('/profile');
  };
  const handleNavigateChangePass = () => {
    history.push('/change-pass');
  };
  const handleNavigateAuth = () => {
    history.push('/auth');
  };
  const menuUser = [
    { callback: handleNavigateProfile, title: 'Profile' },
    { callback: handleNavigateChangePass, title: 'Change pass' },
    { callback: () => logout(false), title: 'Log out' },
  ];

  const menuNotification = listNotifications.map((noti) => ({
    id: noti.id,
    title: (
      <Box className={classes.itemNoti}>
        <Avatar>{noti.message[0]}</Avatar>
        <p className={classes.textNoti}>{noti.message}</p>
      </Box>
    ),
  }));
  const handleMarkReadedAll = () => {
    dispatch(doMarkReadedAll());
  };

  return (
    <Box className={classes.root} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }} className={classes.nav}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <IconButton
            size="large"
            edge="start"
            style={{ color: 'black' }}
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => history.push('/')}
            color="#000"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            Class
          </Typography>
          {children}

          {user ? (
            <>
              <MenuComp
                isNoti
                icon={
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    style={{ marginRight: 10 }}
                  >
                    <Badge
                      badgeContent={listNotifications.filter((noti) => !noti.readed).length}
                      color="error"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                }
                array={menuNotification}
                classMenu={classes.classMenu}
              />

              <div>
                <MenuComp
                  array={menuUser}
                  icon={
                    <Avatar sx={{ bgcolor: '#e15f41', cursor: 'pointer' }}>
                      {user?.name.trim()[0]}
                    </Avatar>
                  }
                />
              </div>
            </>
          ) : (
            <Button
              onClick={handleNavigateAuth}
              style={{ color: 'black', backgroundColor: '#2ecc71' }}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
