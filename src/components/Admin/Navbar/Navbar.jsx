import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import Search from '../../components/search/search';

import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    // color: theme.palette.text.main,
    backgroundColor: '#eb4d4b',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.main,

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

export const Navbar = ({ children, handleDrawerOpen, handleDrawerToggle, open, ...rest }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // signOutStart({ history });

    // history.push("/");
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar {...rest}>
        <Toolbar>
          <Box>
            <Hidden smDown>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={` ${open && classes.menuButtonHidden} `}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden mdUp>
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
          {/* <Search /> */}
          <div className={classes.title}></div>

          {/* {user && user.authority ? (
            <>
              <IconButton className={classes.menuButton}>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <Button onClick={() => setOpenPopup(true)}>Sign In</Button>
          )} */}

          {/* <Avatar className={classes.avatar}>F</Avatar> */}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
