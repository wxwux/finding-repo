import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./ReposListUITheme";

const ReposList = ({ repos }) => {
  const classes = useStyles();

  const tableRows = repos.data.map((repo) => {
    return (
      <li className={classes.item} key={repo.id}>
        <NavLink className={classes.link} to={repo["full_name"]}>
          <Card className={classes.card}>
            <CardContent>
              <Typography component="h5" variant="h5">
                {repo.name}
              </Typography>
            </CardContent>
          </Card>
        </NavLink>
      </li>
    );
  });

  return <ul className={classes.list}> {tableRows} </ul>;
};

export default ReposList;
