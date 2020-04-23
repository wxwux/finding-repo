import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import useStyles from "./SearchBarUITheme";

import { convertMsToHumanFormat } from "../../helpers/dateTime";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchForm from "../../components/SearchForm";

import GitHubIcon from "@material-ui/icons/GitHub";
import TimelapseIcon from "@material-ui/icons/Timelapse";

const SearchBar = ({ repos, findRepoByTitle, lastSearchedItem }) => {
  const [hasError, setHasError] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const sendRequest = (title) => {
    if (!title) {
      setHasError(true);
      enqueueSnackbar("We can't find nothing", { variant: "error" });
      return;
    }

    setHasError(false);
    findRepoByTitle(title);
  };

  useEffect(() => {
    if (Boolean(repos.error)) {
      enqueueSnackbar(repos.error.message, { variant: "error" });
    }
  });

  return (
    <AppBar
      position="relative"
      className={`${classes.container} ${repos.pending ? classes.blocked : ""}`}
    >
      {repos.pending && (
        <div className={classes.progress}>
          <LinearProgress color="secondary"></LinearProgress>
        </div>
      )}
      <Toolbar>
        <SearchForm
          sendRequest={sendRequest}
          hasError={hasError}
          disabled={repos.pending}
          lastSearchedItem={lastSearchedItem}
        />
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
