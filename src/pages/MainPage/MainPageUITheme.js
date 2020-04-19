import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: theme.spacing(4),
  },
  listContainer: {
    flex: 1,
    overflow: "auto",
    marginBottom: theme.spacing(4),
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
