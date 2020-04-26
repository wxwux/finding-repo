import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 50,
    marginTop: theme.spacing(8)
  },
  success: {
    color: theme.palette.success.light
  },
  error: {
    color: theme.palette.error.light
  }
}));

export default useStyles;
