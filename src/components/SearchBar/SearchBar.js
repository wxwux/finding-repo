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

const SearchBar = ({ findRepoByTitle, repos }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [hasError, setHasError] = useState(false);
  const [deboncer, setDeboncer] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const deboncedFunction = (fn, ms) => {
    if (typeof deboncer !== "undefined") {
      clearTimeout(deboncer);
    }

    setDeboncer(setTimeout(fn, ms));
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (!title.trim()) return;
    deboncedFunction(sendRequest, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof deboncer !== "undefined") {
      clearTimeout(deboncer);
    }
    sendRequest();
  };

  const sendRequest = () => {
    const pureTitle = title.trim();

    if (!pureTitle) {
      setHasError(true);
      setTitle("");
      enqueueSnackbar("We can't find nothing", { variant: "error" });
      return;
    }

    setHasError(false);
    findRepoByTitle(pureTitle);
  };

  return (
    <AppBar
      position="relative"
      className={`${classes.container} ${repos.pending ? classes.blocked : ""}`}
    >
      {repos.pending && (
        <LinearProgress
          className={classes.progress}
          color="secondary"
        ></LinearProgress>
      )}
      <Toolbar>
        <form onSubmit={handleSubmit} className={classes.form}>
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
              onInput={handleChange}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </form>
        {repos.total > 0 && (
          <Badge badgeContent={repos.total} max={10000} color="primary">
            <GitHubIcon />
          </Badge>
        )}
        {repos.responseTime > 0 && (
          <div className={classes.time}>
            <TimelapseIcon />
            <div className={classes.timeAmount}>
              {convertMsToHumanFormat(repos.responseTime)}
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
