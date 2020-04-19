import React, { useState } from "react";

import { convertMsToHumanFormat } from "../../helpers/dateTime";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";

import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
import TimelapseIcon from "@material-ui/icons/Timelapse";

import useStyles from "./SearchBarUITheme";

const SearchBar = ({ findRepoByTitle, reposNumber, responseTime }) => {
  const [title, setTitle] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    findRepoByTitle(title);
    setTitle("");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <form onSubmit={sendRequest} className={classes.form}>
          <div className={classes.search}>
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
            <div className={classes.timeAmount}>{convertMsToHumanFormat(responseTime)}</div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
