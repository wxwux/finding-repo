import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./SearchBarUITheme";

const SearchBar = ({ findRepoByTitle }) => {
  const [title, setTitle] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    findRepoByTitle(title, setTitle);
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
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
