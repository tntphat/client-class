import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from './Header.styles';
import { useSelector } from 'react-redux';
import { logout } from '../../../helpers/auth';

export const Header = ({ title }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log('dsadsa');
  }, []);
  // const name = useSelector(state => state.currentClass.name)
  return (
    <Box className={classes.root} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "white"}} className={classes.nav}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <IconButton size="large" edge="start" style={{color: "black"}} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* {name || 'AAAA'} */}
            Title
          </Typography>
          <Button onClick={logout} style={{color: "black", backgroundColor:"#2ecc71"}} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
