import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  errMsg: {
    minWidth: '100%',
    color: ' #bf1650',
    '&::before': {
      display: 'inline',
      content: '"⚠ "',
    },
  },
}));

export default useStyles;
