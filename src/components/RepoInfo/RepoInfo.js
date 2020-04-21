import React from "react";
import { getRelativeDate } from "../../helpers/dateTime";

import Readme from "../Readme";
import Stats from "../Stats";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import useStyles from "./RepoInfoUITheme";

const RepoInfo = ({ repo }) => {
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
      <Typography variant="h2" component="h1" className={classes.title}>
        {repo.name}
      </Typography>
      <Typography variant="h6" component="h6" className={classes.changed}>
        last changed: {relativeDate(repo["pushed_at"])}
      </Typography>

      { repo.description && repo.description.length > 0 && (
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
        <CardContent>
          <Readme />
        </CardContent>
      </Card>
    </>
  );
};

export default RepoInfo;
