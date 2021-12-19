import { Button, Typography, Divider, Container, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useStyles from './Auth.styles';
import { Register, SignIn } from '../../components/Auth';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authWithGg, loadScript, login, loginGg } from '../../helpers';
import { doAuthSocial, doClearError } from '../../redux/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ConfirmDialog } from '../../components/common';

export const Auth = () => {
  // state
  const [tab, setTab] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const Tab = location.state?.Tab;
  const history = useHistory();

  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.user);
  // useEffect

  useEffect(() => {
    authWithGg(process.env.REACT_APP_GOOGLE_CLIENT_ID, onSuccess, onFailure);

    loadScript();
  }, []);

  useEffect(() => {
    if (Tab >= 0) setTab(Tab);
  }, [Tab]);

  useEffect(() => {
    if (error) {
      setOpenDialog(true);
    }
  }, [error]);

  // handle
  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    dispatch(
      doAuthSocial({
        mail: profile.getEmail(),
        name: profile.getName(),
        ggToken: googleUser.vc.id_token,
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

  const onCloseDialog = () => {
    dispatch(doClearError());
    setOpenDialog(false);
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
      {/* <Button
        sx={{ marginBottom: 2 }}
        startIcon={<FacebookIcon />}
        variant="contained"
        fullWidth
        className={classes.btn}
        onClick={() => loginGg(onSuccessLoginFb)}
      >
        Sign in with Facebook
      </Button> */}
      <Box sx={{ display: 'flex' }} alignItems="center" flexDirection="row">
        <div className={classes.divider} />
        <Typography className={classes.or}> Or </Typography>
        <div className={classes.divider} />
      </Box>

      {tab === 0 ? <Register /> : <SignIn />}

      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onClickAction={onCloseDialog}
        textBtn="Ok"
      >
        {tab ? 'Wrong mail or password' : 'Existed mail. Please register with another mail'}
      </ConfirmDialog>

      {/* <Container fixed> */}
      {isLoading ? (
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,.2)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {/* </Container> */}
    </Box>
  );
};
