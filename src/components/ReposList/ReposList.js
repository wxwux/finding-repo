import React from "react";
import { NavLink } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import useStyles from "./ReposListUITheme";

const ReposList = ({ repos }) => {
  const classes = useStyles();

  const tableRows = repos.data.map((repo) => {
    return (
      <ListItem button key={repo.id}>
        <NavLink className={classes.link} to={repo["full_name"]}>
          <Typography component="h5" variant="h5">
            {repo.name}
          </Typography>
        </NavLink>
      </ListItem>
    );
  });

  return <List> {tableRows} </List>;
};

export default ReposList;
