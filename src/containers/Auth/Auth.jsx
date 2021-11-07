import { Button, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { SvgGoogle } from '../../assets/svg';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useStyles from './Auth.styles';
import { Register, SignIn } from '../../components/Auth';
import { useLocation } from 'react-router-dom';

export const Auth = () => {
  const [tab, setTab] = useState(1);
  const classes = useStyles();
  const location = useLocation();
  const Tab = location.state?.Tab;
  useEffect(() => {
    setTab(Tab);
  }, [Tab]);
  return (
    <Box className={classes.root}>
      <Box mb={2}>
        <Typography variant="h4">{tab === 0 ? 'Register' : 'Sign In'}</Typography>
      </Box>
      <Button
        sx={{ marginBottom: 1 }}
        startIcon={<GoogleIcon />}
        variant="contained"
        // color="primary"
        fullWidth
        className={classes.btn}
      >
        Sign {(tab === 1 && 'in') || 'up'} with Google
      </Button>
      <Button
        sx={{ marginBottom: 2 }}
        startIcon={<FacebookIcon />}
        variant="contained"
        fullWidth
        className={classes.btn}
      >
        Sign {(tab === 1 && 'in') || 'up'} with Facebook
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
