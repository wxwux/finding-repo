import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative"
  },
  time: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  timeAmount: {
    marginLeft: theme.spacing(1),
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  blocked: {
    position: "relative",
    pointerEvents: "none",
    "&:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: theme.palette.action.disabled,
    },
  },
}));

export default useStyles;
