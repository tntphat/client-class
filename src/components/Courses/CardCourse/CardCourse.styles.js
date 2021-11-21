import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'unset',
    // margin: '0 auto',
  },
  name: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: '1',
    overflow: 'hidden',
  },
  cardActions: {
    marginTop: 'auto',
  },
}));

export default useStyles;
