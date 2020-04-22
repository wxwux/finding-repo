import React from "react";
import { withSnackbar } from "notistack";

import { convertMsToHumanFormat } from "../../helpers/dateTime";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";

import GitHubIcon from "@material-ui/icons/GitHub";
import SearchIcon from "@material-ui/icons/Search";
import TimelapseIcon from "@material-ui/icons/Timelapse";

import { withStyles } from "@material-ui/core/styles";
import styles from "./SearchBarUITheme";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      hasError: false,
      debouncer: null,
    };
  }

  deboncedFunction = (fn, ms) => {
    if (Boolean(this.state.debouncer)) {
      clearTimeout(this.state.debouncer);
    }

    this.setState({
      debouncer: setTimeout(fn, ms),
    });
  };

  handleChange = (e) => {
    this.setState(
      {
        title: e.target.value.trim(),
      },
      () => {
        if (!this.state.title) return;
        this.deboncedFunction(this.sendRequest, 1000);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.debouncer) {
      clearTimeout(this.state.debouncer);
    }
    this.sendRequest();
  };

  sendRequest = () => {
    if (!this.state.title) {
      this.setState({
        hasError: true,
        title: "",
      });
      this.props.enqueueSnackbar("We can't find nothing", { variant: "error" });
      return;
    }

    this.setState({
      hasError: false,
    });

    this.props.findRepoByTitle(this.state.title);
  };

  render() {
    const { classes, repos } = this.props;
    const { hasError, title } = this.state;
    return (
      <AppBar
        position="relative"
        className={`${classes.container} ${
          repos.pending ? classes.blocked : ""
        }`}
      >
        {repos.pending && (
          <LinearProgress
            className={classes.progress}
            color="secondary"
          ></LinearProgress>
        )}
        <Toolbar>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <div
              className={`${classes.search} ${hasError ? classes.error : ""}`}
            >
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
                onInput={this.handleChange}
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
  }
}

export default withSnackbar(withStyles(styles, { withTheme: true })(SearchBar));
