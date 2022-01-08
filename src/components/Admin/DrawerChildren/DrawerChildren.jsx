import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useStyles, DrawerData } from './DrawerChildren.style';
import { useTheme } from '@material-ui/core';
import { logout } from '../../../helpers';

export const DrawerChildren = ({ children, isMobile, handleDrawerClose, ...rest }) => {
  const classes = useStyles();
  let location = useLocation();
  const locate = location.pathname;
  return (
    <Drawer {...rest}>
      <Box display="flex" flexDirection="row-reverse" alignItems="center">
        <div className={classes.toolbarIcon}>{children}</div>
      </Box>

      <Divider />
      <List>
        {DrawerData.map(
          (item) =>
            true && (
              <Link
                key={item.name}
                className={`${classes.link}  ${locate === item.link && classes.active} `}
                to={item.link}
              >
                <ListItem
                  // onClick={() => isMobile && handleDrawerClose()}
                  button
                >
                  <ListItemIcon className={` ${locate === item.link && classes.active} `}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ),
        )}
      </List>
      <Divider />
      <List>
        <ListItem button key="Log Out" onClick={() => logout(true)}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
      <Link className={classes.link} to="/">
        <ListItem button key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
    </Drawer>
  );
};

export const DrawerRespon = ({
  children,
  handleDrawerClose,
  handleDrawerToggle,
  open,
  mobileOpen,
  classes,
  ...rest
}) => {
  return (
    <nav
      className={`${classes.drawer}  ${!open && classes.drawerShift} `}
      aria-label="mailbox folders"
    >
      <Hidden mdUp implementation="css">
        <DrawerChildren
          // role={selectCurrentEmployee.authority.role}
          variant="temporary"
          handleDrawerClose={handleDrawerToggle}
          isMobile={1}
          anchor={'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        ></DrawerChildren>
      </Hidden>
      <Hidden smDown implementation="css">
        <DrawerChildren
          // role={selectCurrentEmployee.authority.role}
          classes={{
            paper: `${classes.drawerPaper}  ${!open ? classes.drawerPaperClose : ''} `,
          }}
          variant="permanent"
          open={open}
        >
          <IconButton onClick={handleDrawerClose}>
            <ArrowBackIosIcon />
          </IconButton>
        </DrawerChildren>
      </Hidden>
    </nav>
  );
};
