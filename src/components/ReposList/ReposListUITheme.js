import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      textDecoration: "none",
      display: "flex",
      width: "100%",
      alignItems: "center",
    },
    card: {
      textDecoration: "none",
      "&:hover": {
        background: theme.palette.action.hover,
      },
    },
    imageWrapper: {
      minWidth: 50,
      minHeight: 50,
      marginRight: theme.spacing(1),
    },
    title: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    lock: {
      marginLeft: "auto"
    }
  };
});

export default useStyles;
