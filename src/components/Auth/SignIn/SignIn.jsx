import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { InputText } from '../../common';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import useStyles from './SignIn.styles';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { doLogin, doLoginAdmin } from '../../../redux/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../../helpers';

export const SignIn = ({ isAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(isAdmin ? doLoginAdmin(data) : doLogin(data))
      .then(unwrapResult)
      .then((res) => {
        console.log(' WTHHHHHHHHHH');
        login(res.token, isAdmin);
      });
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {isAdmin ? (
        <InputText
          classNameLabel={classes.label}
          error={errors.userName}
          label="Username"
          name="userName"
          register={register}
          rules={{ required: true }}
        />
      ) : (
        <InputText
          classNameLabel={classes.label}
          error={errors.mail}
          label="Mail"
          name="mail"
          register={register}
          rules={{ required: true }}
        />
      )}

      <InputText
        classNameLabel={classes.label}
        error={errors.password}
        label="Password"
        name="password"
        type="password"
        register={register}
      />
      {!isAdmin ? (
        <Typography className={classes.subText}>
          Not a member?
          <span onClick={() => history.replace({ pathname: '/auth', state: { Tab: 0 } })}>
            Sign Up
          </span>
        </Typography>
      ) : null}
      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign in
        </Button>
      </Box>
    </form>
  );
};
