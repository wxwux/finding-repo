import React, { useState } from "react";
import { useSnackbar } from "notistack";

import { convertMsToHumanFormat } from "../../helpers/dateTime";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";

import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
import TimelapseIcon from "@material-ui/icons/Timelapse";

import useStyles from "./SearchBarUITheme";

const SearchBar = ({ findRepoByTitle, reposNumber, responseTime, pending }) => {
  const [title, setTitle] = useState("");
  const [hasError, setHasError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    const pureTitle = title.trim();

    if (!pureTitle) {
      setHasError(true);
      setTitle("");
      enqueueSnackbar("We can't find nothing", {variant: 'error'});
      return;
    }

    setHasError(false);
    findRepoByTitle(pureTitle);
    setTitle("");
  };

  return (
    <AppBar
      position="relative"
      className={`${classes.container} ${pending ? classes.blocked : ""}`}
    >
      {pending && (
        <LinearProgress
          className={classes.progress}
          color="secondary"
        ></LinearProgress>
      )}
      <Toolbar>
        <form onSubmit={sendRequest} className={classes.form}>
          <div className={`${classes.search} ${hasError ? classes.error : ""}`}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Enter the name"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={title}
              onChange={handleChange}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </form>
        {reposNumber > 0 && (
          <Badge badgeContent={reposNumber} max={10000} color="primary">
            <GitHubIcon />
          </Badge>
        )}
        {responseTime > 0 && (
          <div className={classes.time}>
            <TimelapseIcon />
            <div className={classes.timeAmount}>
              {convertMsToHumanFormat(responseTime)}
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
