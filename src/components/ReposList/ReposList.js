import React from "react";
import { NavLink } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LockIcon from "@material-ui/icons/Lock";

import useStyles from "./ReposListUITheme";

const ReposList = ({ repos }) => {
  const classes = useStyles();

  const Items = repos.map((repo) => {
    return (
      <ListItem component="li" button key={repo.id}>
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
          <Typography component="h5" className={classes.title} variant="h5">
            {repo.name}
          </Typography>
          {repo.private && <LockIcon className={classes.lock} />}
        </NavLink>
      </ListItem>
    );
  });

  return <List id="results-list"> {Items} </List>;
};

export default ReposList;
