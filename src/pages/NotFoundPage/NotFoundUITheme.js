import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  number: {
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    textAlign: "center"
  }
}));

export default useStyles;
