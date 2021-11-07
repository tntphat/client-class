import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },

  label: {
    marginTop: theme.spacing(2),
  },

  subText: {
    fontSize: '14px',
    marginTop: theme.spacing(1),

    color: 'rgba(0,0,0,.4)',
    '& > span': {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      marginLeft: 4,
    },
  },
}));

export default useStyles;
