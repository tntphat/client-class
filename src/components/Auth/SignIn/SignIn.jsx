import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { InputText } from '../../common';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import useStyles from './SignIn.styles';
import { useHistory } from 'react-router';

export const SignIn = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <InputText
        classNameLabel={classes.label}
        error={errors.email}
        label="Email"
        name="email"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        classNameLabel={classes.label}
        error={errors.password}
        label="Password"
        name="password"
        register={register}
      />

      <Typography className={classes.subText}>
        Not a member?
        <span onClick={() => history.push({ pathname: '/auth', state: { Tab: 0 } })}>Sign Up</span>
      </Typography>
      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign in
        </Button>
      </Box>
    </form>
  );
};
