import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    height: '120px',
    maxWidth: '800px',
    marginBottom: '20px',
    fontSize: '50px',
    display: 'flex',
    borderRadius: 10,
    // margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    // width: '70%',
    flex: 1,
    paddingLeft: 10,
  },
  input: {
    maxWidth: '70%',
    marginRight: 4,
    // overflow: 'hidden',
  },
  inputDisabled: {
    backgroundColor: '#e2e0e2',
  },
}));

export default useStyles;
