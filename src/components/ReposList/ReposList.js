import React from "react";
import { NavLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import useStyles from "./ReposListUITheme";

const ReposList = ({ repos }) => {
  const classes = useStyles();

  const Items = repos.map((repo) => {
    return (
      <ListItem button key={repo.id}>
        <NavLink className={classes.link} to={repo["full_name"]}>
          <div className={classes.imageWrapper}>
            <LazyLoadImage
              src={repo.owner["avatar_url"]}
              alt="avatar"
              effect="blur"
              width="50"
              height="50"
            />
          </div>
          <Typography component="h5" variant="h5">
            {repo.name}
          </Typography>
        </NavLink>
      </ListItem>
    );
  });
  
  return <List> {Items} </List>;
};

export default ReposList;
