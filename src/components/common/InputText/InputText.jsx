import { InputLabel, TextField } from '@material-ui/core';
import React from 'react';
import { ErrroMessage } from '..';

export const InputText = ({
  register,
  label,
  outlinedLabel,
  name,
  error,
  rules,
  classNameLabel,
  className,
  errMsgRow,
  ...rest
}) => {
  return (
    <>
      {label ? (
        <InputLabel className={classNameLabel} htmlFor={name}>
          {label}
        </InputLabel>
      ) : null}
      <TextField
        {...rest}
        className={className}
        id={name}
        label={outlinedLabel}
        margin="dense"
        variant="outlined"
        {...register(name, rules)}
        fullWidth
      />
      <ErrroMessage errMsgRow error={error} />
    </>
  );
};
