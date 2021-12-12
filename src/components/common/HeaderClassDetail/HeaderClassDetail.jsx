import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from './HeaderClassDetail.styles';
import { useSelector } from 'react-redux';
import { logout } from '../../../helpers/auth';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHistory, useLocation } from 'react-router';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export const HeaderClassDetail = ({ val }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(val)
  const location = useLocation()

  const classes = useStyles();
  useEffect(() => { }, []);
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

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    const temp = location.pathname.split('/')
    temp[temp.length - 1] = newValue
    history.push(temp.join('/'))
  };

  return (
    <Box className={classes.root} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }} className={classes.nav}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', width: '300px' }}>
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
            <div style={{ fontWeight: 450, fontSize: '1.25rem', color: 'black' }} onClick={() => history.push('/')}>
              Classrooms Managerss
            </div>
          </div>
          <div style={{ width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              value && (
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab value={'infor'} label="BẢNG TIN" />
                  <Tab value={'mem'} label="THÀNH VIÊN" />
                  <Tab value={'grade-table'} label="BẢNG ĐIỂM" />
                </Tabs>
              )
            }
          </div>
          <div style={{ width: '300px', display: 'flex', justifyContent: 'end', alignItems: 'center', marginRight: '10px' }}>
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

          </div>

        </div>
      </AppBar>
    </Box>
  );
};
