import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useStyles from './HeaderClassDetail.styles';
import { useSelector } from 'react-redux';

export const HeaderClassDetail = ({ title }) => {
  const [value, setValue] = React.useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  useEffect(() => {
    console.log('dsadsa');
  }, []);
  // const name = useSelector(state => state.currentClass.name)
  return (
    <Box className={classes.root} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }} className={classes.nav}>
        <Toolbar variant="dense" className={classes.toolBar} style={{display:"flex", justifyContent:"space-between"}}>
          <IconButton size="large" edge="start" style={{ color: "black" }} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="BẢNG TIN" />
            <Tab value="two" label="MỌI NGƯỜI" />
            <Tab value="three" label="SỐ ĐIỂM" />
          </Tabs>
          <Button style={{ color: "black", backgroundColor: "#2ecc71" }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
