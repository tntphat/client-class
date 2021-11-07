import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import useStyles from './ErrorMessage.style';

export const ErrroMessage = ({ error, minL, maxL, min, max, params }) => {
  const classes = useStyles();
  if (error) {
    switch (error.type) {
      case 'required':
        return <FormHelperText className={classes.errMsg}>This is required</FormHelperText>;
      case 'minLength':
        return (
          <FormHelperText className={classes.errMsg}>
            This field needs min {minL || 2} characters
          </FormHelperText>
        );
      case 'maxLength':
        return (
          <FormHelperText className={classes.errMsg}>
            This field needs max {maxL || 2} characters
          </FormHelperText>
        );
      case 'pattern':
        return (
          <FormHelperText className={classes.errMsg}>Enter a valid email address</FormHelperText>
        );
      case 'min':
        return <FormHelperText className={classes.errMsg}>Min val is {min}</FormHelperText>;
      case 'max':
        return <FormHelperText className={classes.errMsg}>Max val is {max}</FormHelperText>;
      case 'validate':
        return <FormHelperText className={classes.errMsg}>Username is already used</FormHelperText>;
      case 'myErr':
        return <FormHelperText className={classes.errMsg}>{error.message}</FormHelperText>;
      default:
        return null;
    }
  }

  return null;
};
