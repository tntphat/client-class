import { Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { InputText } from '../../../common';
import useStyles from './FormAddUser.style';

export const FormAddUser = ({ setOpenDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(doAddClass(data));
    setOpenDialog(false);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Add new Admin</Typography>
      <InputText
        error={errors.name}
        label="Name"
        name="name"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        error={errors.mail}
        label="mail"
        name="mail"
        register={register}
        rules={{ required: true }}
      />

      <InputText error={errors.username} label="username" name="username" register={register} />

      <InputText
        error={errors.password}
        label="password"
        name="password"
        type="password"
        register={register}
      />
      <Button variant="contained" type="submit">
        Ok
      </Button>
    </form>
  );
};
