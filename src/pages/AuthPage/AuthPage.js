import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getParamFromQueryString } from "../../helpers/queries";
import { connect } from "react-redux";
import { fetchUserRequest, fetchTokenRequest } from "../../store/actions";
import useStyles from "./AuthPageUITheme";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const AuthPage = ({ fetchUserRequest, fetchTokenRequest, token }) => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const code = getParamFromQueryString(location.search, "code");
    if (code) {
      fetchTokenRequest(code);
    } else {
      history.replace("/");
    }
  }, [fetchTokenRequest, history, location.search]);

  if (token.pending) {
    return <CircularProgress className={classes.icon} />;
  }

  if (token.error) {
    return <ErrorOutlineIcon className={[classes.icon, classes.error]} />;
  }

  return (
    <>
      <DoneIcon className={[classes.icon, classes.success]} />
      <Typography variant="h5" component="h5">
        You're about to be redirecred back now
      </Typography>
    </>
  );
};

const mapDispatchToPros = { fetchUserRequest, fetchTokenRequest };
const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps, mapDispatchToPros)(AuthPage);
