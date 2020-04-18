import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleRepoRequest } from "../../store/actions";

import UserInfo from "../../components/UserInfo";
import RepoInfo from "../../components/RepoInfo";

import Grid from "@material-ui/core/Grid";

const RepoPage = ({ fetchSingleRepoRequest, repo }) => {
  const { owner, title } = useParams();
  const { pending, error, data } = repo;

  useEffect(() => {
    console.log("effect works");

    fetchSingleRepoRequest({
      owner,
      title,
    });
  }, [fetchSingleRepoRequest, owner, title]);

  if (pending) {
    return "loading";
  }

  if (!data) {
    return "no data";
  } else {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <UserInfo user={data.owner} />;
        </Grid>
        <Grid item xs={6}>
          <RepoInfo repo={data} />
        </Grid>
      </Grid>
    );
  }
};

const mapDispatchToProps = { fetchSingleRepoRequest };
const mapStateToProps = ({ singleRepo: repo }) => ({ repo });

export default connect(mapStateToProps, mapDispatchToProps)(RepoPage);
