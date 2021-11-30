import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 500,
  },
  header: {
    background: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      background: '#3742fa',
    },
  },
  box: {
    backgroundColor: 'red',
    width: '100%',
    height: '100px',
    marginBottom: '20px',
    fontSize: '50px',
  },
}));

export default useStyles;
