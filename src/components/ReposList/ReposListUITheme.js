import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    link: {
      textDecoration: "none",
      display: "block"
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
