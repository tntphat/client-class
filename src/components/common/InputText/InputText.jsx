import { InputLabel, TextField } from '@material-ui/core';
import React from 'react';
import { ErrroMessage } from '..';

export const InputText = ({ register, label, name, error, rules, classNameLabel }) => {
  return (
    <>
      <InputLabel className={classNameLabel} htmlFor={name}>
        {label}
      </InputLabel>
      <TextField id={name} margin="dense" variant="outlined" {...register(name, rules)} fullWidth />
      <ErrroMessage error={error} />
    </>
  );
};
