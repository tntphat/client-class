import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    display: 'flex',
    flexDirection: ' column',
  },
  gridRow: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginTop: '10px',
    },
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#636e72',
    height: '30px',
    width: '30px',
    borderRadius: '50%',
    '& > svg': {
      color: 'white',
    },
    marginRight: '10px',
    flexShrink: 0,
  },
  text: {
    // color: '#2f3640',
    fontWeight: 'bold!important',
  },
  userCourses: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#353b48',
    },
  },
  dividerVertical: {
    width: '1px',
    height: '30px',
    background: '#353b48',
    margin: '0 15px',
  },
}));

export default useStyles;
