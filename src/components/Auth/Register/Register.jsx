import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { unwrapResult } from '@reduxjs/toolkit';
import { ErrroMessage, InputText } from '../../common';
import React from 'react';
import { TextField, InputLabel, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import useStyles from './Register.styles';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { doCreateUser } from '../../../redux/slice';

export const Register = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(doCreateUser(data))
      .then(unwrapResult)
      .then((res) => {
        history.push({ pathname: '/auth', state: { Tab: 1 } });
      });
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <InputText
        classNameLabel={classes.label}
        error={errors.name}
        label="Name"
        name="name"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        classNameLabel={classes.label}
        error={errors.mail}
        label="Mail"
        name="mail"
        register={register}
        rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
      />

      <InputText
        type="password"
        classNameLabel={classes.label}
        error={errors.password}
        label="Password"
        name="password"
        register={register}
        rules={{ required: true }}
      />

      <Typography className={classes.subText}>
        Already a member?
        <span onClick={() => history.push({ pathname: '/auth', state: { Tab: 1 } })}>Sign In</span>
      </Typography>
      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign up
        </Button>
      </Box>
    </form>
  );
};
