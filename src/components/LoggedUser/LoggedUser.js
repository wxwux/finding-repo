import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import useStyles from "./LoggedUserUITheme";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSnackbar } from "notistack";

const LoggedUser = ({ user, logout }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user.error) {
      enqueueSnackbar(user.error.message, { variant: "error" });
    }
  }, [enqueueSnackbar, user.error]);

  if (user.pending) return <LinearProgress />;

  if (user.error) return "";

  return (
    <Card className={classes.container}>
      <img
        className={classes.avatar}
        src={user.data["avatar_url"]}
        width="50"
        alt="user avatar"
      />
      <div>{user.data.login}</div>
      <Button
        size="small"
        onClick={logout}
        className={classes.btn}
        color="primary"
      >
        logout
      </Button>
    </Card>
  );
};

LoggedUser.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.object,
  }),
  logout: PropTypes.func.isRequired,
};

export default React.memo(LoggedUser);
