import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchReposByQueryRequest,
  addSearchHistoryItem,
  fetchUserRequest,
  logoutUser,
} from "../../store/actions";
import { queryConstructor } from "../../helpers/queries";
import { lastSearchSelector } from "../../store/selectors";

import SearchBar from "../../components/SearchBar";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ReposList from "../../components/ReposList";
import SearchHistory from "../../components/SearchHistory";
import LoggedUser from "../../components/LoggedUser";

import useStyles from "./MainPageUITheme";

const MainPage = ({
  repos,
  fetchReposByQueryRequest,
  lastSearchedItem,
  searchHistory,
  fetchUserRequest,
  user,
  logoutUser,
}) => {
  const classes = useStyles();

  const handlePaginationChange = (e, pageNum) => {
    const query = queryConstructor.byPageForTitle(pageNum, lastSearchedItem);
    fetchReposByQueryRequest(query);
  };

  const findRepoByTitle = (title) => {
    const query = queryConstructor.byTitle(title);
    fetchReposByQueryRequest(query);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserRequest();
    }
  }, [fetchUserRequest, token]);

  return (
    <Container maxWidth="sm" className={classes.rootContainer}>
      {token && token.length > 0 && (
        <LoggedUser logout={logoutUser} user={user} />
      )}
      <SearchBar
        lastSearchedItem={lastSearchedItem}
        findRepoByTitle={findRepoByTitle}
        repos={repos}
        user={user}
      />
      {searchHistory.length > 0 && (
        <SearchHistory
          searchHistory={searchHistory}
          findRepoByTitle={findRepoByTitle}
        />
      )}
      {repos.data.length > 0 && (
        <Paper square className={classes.listContainer}>
          <ReposList repos={repos.data} />
        </Paper>
      )}
      {repos.pagination.total && (
        <div className={classes.paginationContainer}>
          <Pagination
            count={repos.pagination.total}
            onChange={handlePaginationChange}
            page={repos.pagination.active}
            disabled={repos.pending}
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </Container>
  );
};

const mapDispatchToProps = {
  fetchReposByQueryRequest,
  addSearchHistoryItem,
  fetchUserRequest,
  logoutUser,
};

const mapStateToProps = (state) => ({
  repos: state.repos,
  lastSearchedItem: lastSearchSelector(state),
  searchHistory: state.searchHistory,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
