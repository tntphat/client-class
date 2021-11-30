import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import useStyles from './ErrorMessage.style';

export const ErrroMessage = ({ error, minL, maxL, min, max, errMsgRow, params }) => {
  const classes = useStyles();
  if (error) {
    return (
      <FormHelperText style={{ minWidth: errMsgRow && 'unset' }} className={classes.errMsg}>
        {error?.message || 'This is required'}
      </FormHelperText>
    );
  }

  return null;
};
