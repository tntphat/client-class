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

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  useEffect(() => {}, []);
  const { user, isLoading } = useSelector((state) => state.user);
  const history = useHistory();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNavigateProfile = () => {
    setAnchorEl(null);
    history.push('/profile');
  };
  const handleNavigateAuth = () => {
    history.push('/auth');
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
            Classrooms Manager
          </Typography>
          {user ? (
            <div>
              <Avatar sx={{ bgcolor: '#e15f41', cursor: 'pointer' }} onClick={handleMenu}>
                {user?.name.trim()[0]}
              </Avatar>
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // color="inherit"
              >
                <AccountCircle color="black" />
              </IconButton> */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </div>
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
