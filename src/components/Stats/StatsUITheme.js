import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    display: "flex",
  },
  item: {
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  number: {
    marginLeft: theme.spacing(0.5),
  },
}));

export default useStyles;
