import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  item: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default useStyles;
