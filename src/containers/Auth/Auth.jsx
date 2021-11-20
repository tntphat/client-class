import { Button, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useStyles from './Auth.styles';
import { Register, SignIn } from '../../components/Auth';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authWithGg, loadScript, login, loginGg } from '../../helpers';
import { doAuthSocial } from '../../redux/slice';
import { unwrapResult } from '@reduxjs/toolkit';

export const Auth = () => {
  // state
  const [tab, setTab] = useState(1);
  const classes = useStyles();
  const location = useLocation();
  const Tab = location.state?.Tab;
  const history = useHistory();

  const dispatch = useDispatch();
  // useEffect

  useEffect(() => {
    authWithGg(process.env.REACT_APP_GOOGLE_CLIENT_ID, onSuccess, onFailure);

    loadScript();
  }, []);

  useEffect(() => {
    setTab(Tab);
  }, [Tab]);

  // handle
  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    dispatch(
      doAuthSocial({
        mail: profile.getEmail(),
        name: profile.getName(),
        ggToken: googleUser.wc.id_token,
      }),
    )
      .then(unwrapResult)
      .then((res) => {
        login(res.token);
      });
  };

  const onFailure = () => {
    setIsLoggedIn(false);
  };

  const onSuccessLoginFb = ({ data, accessToken }) => {
    dispatch(
      doAuthSocial({
        mail: data.email,
        name: data.name,
        fbToken: accessToken,
      }),
    )
      .then(unwrapResult)
      .then((res) => {
        login(res.token);
      });
  };

  return (
    <Box className={classes.root}>
      <Box mb={2}>
        <Typography variant="h4">{tab === 0 ? 'Register' : 'Sign In'}</Typography>
      </Box>

      <Button
        id="customBtn"
        sx={{ marginBottom: 1 }}
        startIcon={<GoogleIcon />}
        variant="contained"
        // color="primary"
        fullWidth
        className={classes.btn}
      >
        Sign in with Google
      </Button>
      <Button
        sx={{ marginBottom: 2 }}
        startIcon={<FacebookIcon />}
        variant="contained"
        fullWidth
        className={classes.btn}
        onClick={() => loginGg(onSuccessLoginFb)}
      >
        Sign in with Facebook
      </Button>
      <Box sx={{ display: 'flex' }} alignItems="center" flexDirection="row">
        <div className={classes.divider} />
        <Typography className={classes.or}> Or </Typography>
        <div className={classes.divider} />
      </Box>

      {tab === 0 ? <Register /> : <SignIn />}
    </Box>
  );
};
