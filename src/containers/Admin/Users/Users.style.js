import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  bannedRow: {
    position: 'relative',
    color: 'black!important',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      background: 'rgba(0,0,0, .4) ',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
}));

export default useStyles;
