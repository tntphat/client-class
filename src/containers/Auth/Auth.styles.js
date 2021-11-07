import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 auto',
    overflow: 'hidden',
  },
  btn: {
    textTransform: 'capitalize!important',
  },
  or: {
    color: 'rgba(0,0,0,0.5)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,.4)',
    flex: 1,
    width: 150,
    margin: '0 20px',
  },
}));

export default useStyles;
