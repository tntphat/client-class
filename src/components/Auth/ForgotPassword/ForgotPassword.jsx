import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { InputText } from '../../common';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import useStyles from './ForgotPassword.styles';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { doLogin, doLoginAdmin, doRenewPassword } from '../../../redux/slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../../helpers';
import { apiAuth } from '../../../services/api';

export const ForgotPassword = ({ isAdmin, setOpenDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const onSubmit = (data) => {
    dispatch(doRenewPassword(data))
      .then(unwrapResult)
      .then((res) => setOpenDialog(res.message));
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
          rules={{
            required: true,
            pattern: {
              value:
                /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
              message: 'Invalid email',
            },
          }}
        />
      )}
      {!isAdmin ? (
        <Typography className={classes.subText}>
          Remembered Password ?
          <span onClick={() => history.replace({ pathname: '/auth', state: { Tab: 1 } })}>
            Sign In
          </span>
        </Typography>
      ) : null}
      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Send
        </Button>
      </Box>
    </form>
  );
};
