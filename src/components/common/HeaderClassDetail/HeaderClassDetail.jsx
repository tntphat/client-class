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
import { Header } from '..';

export const HeaderClassDetail = ({ val }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(val);
  const location = useLocation();

  const classes = useStyles();
  useEffect(() => {}, []);
  const history = useHistory();

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    const temp = location.pathname.split('/');
    temp[temp.length - 1] = newValue;
    history.push(temp.join('/'));
  };

  return (
    <Header>
      <div
        style={{
          width: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {value && (
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab value={'infor'} label="BẢNG TIN" />
            <Tab value={'mem'} label="THÀNH VIÊN" />
            <Tab value={'grade-table'} label="BẢNG ĐIỂM" />
          </Tabs>
        )}
      </div>
    </Header>
  );
};
