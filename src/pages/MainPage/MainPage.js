import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchReposByQueryRequest,
  addSearchHistoryItem,
} from "../../store/actions";
import { queryConstructor } from "../../helpers/queries";
import { lastSearchSelector } from "../../store/selectors";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import SearchHistory from "../../components/SearchHistory";

import "./MainPage.css";
import useStyles from "./MainPageUITheme";

const MainPage = ({
  repos,
  fetchReposByQueryRequest,
  addSearchHistoryItem,
  lastSearchedItem
}) => {
  const [title, setTitle] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const sendRequest = (e) => {
    e.preventDefault();
    const wasSearchedLately = title === lastSearchedItem;

    if (wasSearchedLately) {
      setTitle("");
      return;
    }

    const query = queryConstructor.byTitle(title);
    fetchReposByQueryRequest(query);

    addSearchHistoryItem(title);
    setTitle("");
  };

  const handlePaginationChange = (e, pageNum) => {
    const query = queryConstructor.byPageForTitle(pageNum, lastSearchedItem);
    fetchReposByQueryRequest(query);
  };

  const tableRows = repos.data.map((repo) => {
    return (
      <tr key={repo.id}>
        <td>{repo.name}</td>
        <td>
          <img src={repo.owner["avatar_url"]} width="100" alt="avatar" />
        </td>
        <td>
          <Link to={repo["full_name"]}>Details</Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="app-container">
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              FINDING REPO
            </Typography>
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
      </div>
      <div>
        <div>Repos has been found: {repos.total}</div>
        <div>Last request took: {repos.responseTime}</div>
      </div>
      {repos.pagination.total && (
        <Pagination
          count={repos.pagination.total}
          onChange={handlePaginationChange}
          showFirstButton
          showLastButton
        />
      )}

      <SearchHistory />
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

const mapDispatchToProps = { fetchReposByQueryRequest, addSearchHistoryItem };

const mapStateToProps = (state) => ({
  repos: state.repos,
  lastSearchedItem: lastSearchSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
