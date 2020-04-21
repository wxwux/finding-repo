import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchSingleRepoRequest } from "../../store/actions";

import UserInfo from "../../components/UserInfo";
import RepoInfo from "../../components/RepoInfo";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useStyles from "./RepoPageUITheme";

const RepoPage = ({ fetchSingleRepoRequest, repo }) => {
  const { owner, title } = useParams();
  const { pending, error, data } = repo;
  const classes = useStyles();

  useEffect(() => {
    console.log("effect works");

    fetchSingleRepoRequest({
      owner,
      title,
    });
  }, [fetchSingleRepoRequest, owner, title]);

  if (pending) return <p>loading</p>;

  if (error && error.status === 404) {
    return <Redirect to="/404" />
  }

  // return "owner"
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <UserInfo user={data.owner} />
        </Grid>
        <Grid item xs={8}>
          <RepoInfo repo={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = { fetchSingleRepoRequest };
const mapStateToProps = ({ singleRepo: repo }) => ({ repo });

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
