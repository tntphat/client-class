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
import { apiOtp } from '../../../services/api';
import { useModalLoading } from '../../../hooks';

export const Register = ({ setOpenDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleOpenModalLoading, handleCloseModalLoading } = useModalLoading();

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    handleOpenModalLoading();
    // dispatch(doCreateUser(data))
    //   .then(unwrapResult)
    //   .then((res) => {
    //     if (res.result) {
    //       history.push({ pathname: '/auth', state: { Tab: 1 } });
    //       return;
    //     }
    //     setOpenDialog(res.message);
    //   });

    apiOtp
      .requestOtp(data)
      .then((res) => {
        handleCloseModalLoading();
        if (res.data.result) {
          history.push({ pathname: '/verify', state: { data } });
          return;
        }
        setOpenDialog(res.message);
      })
      .catch(() => handleCloseModalLoading());
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
        rules={{
          pattern: {
            value:
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            message: 'Invalid email',
          },
          required: true,
        }}
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
        <span onClick={() => history.replace({ pathname: '/auth', state: { Tab: 1 } })}>
          Sign In
        </span>
      </Typography>
      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign up
        </Button>
      </Box>
    </form>
  );
};
