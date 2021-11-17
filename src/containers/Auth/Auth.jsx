import { Button, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useStyles from './Auth.styles';
import { Register, SignIn } from '../../components/Auth';
import { useLocation } from 'react-router-dom';
import { loadScript, login, logout } from '../../helpers';
import FacebookLogin from 'react-facebook-login';

// import FacebookLogin from 'react-facebook-login';

const googleClientId = '1017250446015-7cdiqru941mjct7o9rdoonrjrdbo75ja.apps.googleusercontent.com';

export const Auth = () => {
  // state
  const [tab, setTab] = useState(1);
  const classes = useStyles();
  const location = useLocation();
  const Tab = location.state?.Tab;

  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();

  const [dataFb, setDataFb] = useState();
  // useEffect

  useEffect(() => {
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;

      _gapi.load('auth2', () => {
        (async () => {
          const _googleAuth = await _gapi.auth2.init({
            client_id: googleClientId,
          });
          _googleAuth.attachClickHandler(
            document.getElementById('customBtn'),
            {
              prompt: 'consent',
            },
            onSuccess,
            onFailure,
          );
          setGoogleAuth(_googleAuth);
        })();
      });
    };

    loadScript();
  }, []);

  useEffect(() => {
    setTab(Tab);
  }, [Tab]);

  useEffect(() => {
    console.log(dataFb);
  }, [dataFb]);

  // handle
  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };

  const onFailure = () => {
    setIsLoggedIn(false);
  };

  const logOut = () => {
    (async () => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
    })();
  };

  return (
    <Box className={classes.root}>
      <Box mb={2}>
        <Typography variant="h4">{tab === 0 ? 'Register' : 'Sign In'}</Typography>
      </Box>

      {isLoggedIn && (
        <div>
          <div>
            <img src={imageUrl} />
          </div>
          <div>{name}</div>
          <div>{email}</div>
          <button className="btn-primary" onClick={logOut}>
            Log Out
          </button>
        </div>
      )}

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
        onClick={() => login(setDataFb)}
      >
        Sign in with Facebook
      </Button>
      {/* <Button onClick={logout}> log out </Button> */}
      {/* <div
        class="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div> */}

      {/* <FacebookLogin
        appId="1069750190503076"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
      /> */}
      <Box sx={{ display: 'flex' }} alignItems="center" flexDirection="row">
        <div className={classes.divider} />
        <Typography className={classes.or}> Or </Typography>
        <div className={classes.divider} />
      </Box>

      {tab === 0 ? <Register /> : <SignIn />}
    </Box>
  );
};
