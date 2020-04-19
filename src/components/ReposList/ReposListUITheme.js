import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    list: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      marginBottom: theme.spacing(2),
    },
    link: {
      textDecoration: "none",
    },
    card: {
      textDecoration: "none",
      "&:hover": {
        background: theme.palette.action.hover,
      },
    },
  };
});

export default useStyles;
