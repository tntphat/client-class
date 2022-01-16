import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // maxWidth: '100',
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
  inputStyle: {
    width: '3rem !important',
    height: '3rem',
    margin: '0 1rem',
    fontSize: '2rem',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.3)',
  },
  containerStyle: {
    display: 'flex',
    margin: '20px 0',
  },
  errorStyle: {
    border: '1px solid red !important',
  },
}));

export default useStyles;
