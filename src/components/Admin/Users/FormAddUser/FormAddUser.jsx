import { Button, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { doClearErrors, doCreateAdmin } from '../../../../redux/slice';
import { ConfirmDialog, InputText } from '../../../common';
import useStyles from './FormAddUser.style';

export const FormAddUser = ({ setOpenDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openDialogErr, setOpenDialogErr] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(doCreateAdmin(data))
      .then(unwrapResult)
      .then(() => {
        setOpenDialog(false);
      })
      .catch(() => {
        setOpenDialogErr(true);
      });
  };

  const onCloseDialog = () => {
    setOpenDialogErr(false);
    dispatch(doClearErrors());
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

      <InputText
        error={errors.phoneNumber}
        label="Phone number"
        name="phoneNumber"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        error={errors.userName}
        label="Username"
        name="userName"
        register={register}
        rules={{ required: true }}
      />

      <InputText
        error={errors.password}
        label="password"
        name="password"
        type="password"
        register={register}
        rules={{ required: true }}
      />
      <Button variant="contained" type="submit">
        Ok
      </Button>
      <ConfirmDialog
        openDialog={openDialogErr}
        setOpenDialog={setOpenDialogErr}
        onClickAction={onCloseDialog}
        textBtn="Ok"
      >
        Existed username. Pls fill in another one
      </ConfirmDialog>
    </form>
  );
};
