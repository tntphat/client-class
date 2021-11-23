import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    width: '100%',
    minHeight: '100vh',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 100,
  },
  center: {
    marginTop: 60,
  },
}));

export default useStyles;
