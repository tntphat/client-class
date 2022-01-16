import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router-dom';
import { apiOtp } from '../../services/api';
import useStyles from './VerifyOtp.style';
import { useModalLoading } from '../../hooks';

export const VerifyOtp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [otp, setOtp] = useState('');
  const [hasErrored, setHasErrored] = useState(false);
  const { handleOpenModalLoading, handleCloseModalLoading } = useModalLoading();
  const data = history.location.state?.data;
  const handleChange = (otp) => {
    if (hasErrored) setHasErrored(false);
    setOtp(otp);
  };
  console.log(data);
  const handleSubmit = () => {
    handleOpenModalLoading();
    apiOtp
      .registerOtp({
        otp,
        ...data,
      })
      .then((res) => {
        handleCloseModalLoading();
        if (res.data.result) {
          history.push({ pathname: '/auth', state: { Tab: 1 } });
          return;
        }
        setHasErrored(true);
      });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4">Enter code sent to your mail</Typography>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={<span>-</span>}
        containerStyle={classes.containerStyle}
        inputStyle={classes.inputStyle}
        placeholder="000000"
        hasErrored={hasErrored}
        errorStyle={classes.errorStyle}
      />
      {hasErrored && (
        <Typography style={{ color: '#ff3838', margin: '10px 0' }} variant="h6">
          Wrong OTP code
        </Typography>
      )}
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};
