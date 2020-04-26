import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  btn: {
    marginLeft: "auto"
  }
}));

export default useStyles;
