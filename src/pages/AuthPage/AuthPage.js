import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getParamFromQueryString } from "../../helpers/queries";
import { connect } from "react-redux";
import { fetchUserRequest, fetchTokenRequest } from "../../store/actions";
import useStyles from "./AuthPageUITheme";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const AuthPage = ({ fetchUserRequest, fetchTokenRequest, token }) => {
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    const code = getParamFromQueryString(location.search, "code");
    if (code) {
      fetchTokenRequest(code);
    }
  }, [fetchTokenRequest, location.search]);

  if (token.pending) {
    return <CircularProgress className={classes.icon} />;
  }

  if (token.error) {
    return <ErrorOutlineIcon className={[classes.icon, classes.error]} />;
  }

  return <AssignmentTurnedInIcon className={[classes.icon, classes.success]} />;
};

const mapDispatchToPros = { fetchUserRequest, fetchTokenRequest };
const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps, mapDispatchToPros)(AuthPage);
