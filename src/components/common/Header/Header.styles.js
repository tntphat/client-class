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
  itemNoti: {
    maxWidth: 500,
    display: 'flex',
    alignItems: 'center',
  },
  textNoti: {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    marginLeft: 10,
  },
}));

export default useStyles;
