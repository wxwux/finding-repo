import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
}));

export default useStyles;
