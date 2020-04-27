import React from "react";
import PropTypes from "prop-types";
import { getRelativeDate } from "../../helpers/dateTime";

import Readme from "../Readme";
import Stats from "../Stats";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import useStyles from "./RepoInfoUITheme";

const RepoInfo = ({ repo, readme, fetchReadmeRequest }) => {
  const classes = useStyles();

  const relativeDate = (date) => {
    return getRelativeDate(new Date(date));
  };

  return (
    <>
      <Stats
        forks={repo.forks}
        issues={repo["open_issues"]}
        subscribers={repo["subscribers_count"]}
        stars={repo["stargazers_count"]}
      />
      <Typography
        variant="h2"
        id="repo-title"
        component="h1"
        className={classes.title}
      >
        {repo.name}
      </Typography>
      <Typography variant="h6" component="h6" className={classes.changed}>
        last changed:{" "}
        <span id="last-changed">{relativeDate(repo["pushed_at"])}</span>
      </Typography>

      {repo.description && repo.description.length > 0 && (
        <>
          <Divider className={classes.divider} />
          <Typography
            variant="h5"
            className={classes.description}
            component="h3"
          >
            {repo.description}
          </Typography>
        </>
      )}
      <Card>
        <CardContent id="readme-container">
          <Readme readme={readme} />
        </CardContent>
      </Card>
    </>
  );
};

RepoInfo.propTypes = {
  repo: PropTypes.object.isRequired,
  readme: PropTypes.object,
  fetchReadmeRequest: PropTypes.func.isRequired,
};

export default React.memo(RepoInfo);
