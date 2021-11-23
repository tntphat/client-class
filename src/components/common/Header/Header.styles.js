import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    zIndex: 100,
  },
  nav: {
    height: '100%',
  },
  toolBar: {
    height: '100%',
    minHeight: 'unset',
  },
}));

export default useStyles;
