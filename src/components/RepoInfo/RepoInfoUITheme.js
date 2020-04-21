import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    title: {
      margin: theme.spacing(2, 0),
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    changed: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2),
    },
    description: {
      marginBottom: theme.spacing(2)
    },
  };
});

export default useStyles;
