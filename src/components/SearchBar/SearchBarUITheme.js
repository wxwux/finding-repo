import { fade } from "@material-ui/core/styles";

const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: "1px solid transparent",
    marginRight: theme.spacing(2),
    width: "100%",
    marginLeft: theme.spacing(3),
  },
  error: {
    borderColor: theme.palette.error.main,
  },
  form: {
    display: "flex",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
    bottom: 0,
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
});

export default styles;