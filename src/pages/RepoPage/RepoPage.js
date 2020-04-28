import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  fetchSingleRepoRequest,
  fetchReadmeRequest,
} from "../../store/actions";

import LinearProgress from "@material-ui/core/LinearProgress";

import { useSnackbar } from "notistack";

import UserInfo from "../../components/UserInfo";
import RepoInfo from "../../components/RepoInfo";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useStyles from "./RepoPageUITheme";

const RepoPage = ({
  fetchSingleRepoRequest,
  repo,
  readme,
  fetchReadmeRequest,
}) => {
  const { owner, title } = useParams();
  const { pending, error, data } = repo;
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    fetchSingleRepoRequest({
      owner,
      title,
    });
  }, [fetchSingleRepoRequest, owner, title]);

  if (pending) {
    return <LinearProgress className={classes.loader} color="secondary" />;
  }

  if (error && error.status === 404) {
    return <Redirect to="/404" />;
  }

  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <UserInfo user={data.owner} />
        </Grid>
        <Grid item xs={8}>
          <RepoInfo
            repo={data}
            readme={readme}
            fetchReadmeRequest={fetchReadmeRequest}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = { fetchSingleRepoRequest, fetchReadmeRequest };
const mapStateToProps = ({ singleRepo: repo, readme }) => ({ repo, readme });

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(RepoPage)
);
