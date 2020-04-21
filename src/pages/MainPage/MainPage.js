import React from "react";
import { connect } from "react-redux";

import {
  fetchReposByQueryRequest,
  addSearchHistoryItem,
} from "../../store/actions";
import { queryConstructor } from "../../helpers/queries";
import { lastSearchSelector } from "../../store/selectors";

import SearchBar from "../../components/SearchBar";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import ReposList from "../../components/ReposList";
import SearchHistory from "../../components/SearchHistory";

import { useSnackbar } from "notistack";

import useStyles from "./MainPageUITheme";

const MainPage = ({
  repos,
  fetchReposByQueryRequest,
  addSearchHistoryItem,
  lastSearchedItem,
  searchHistory,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handlePaginationChange = (e, pageNum) => {
    const query = queryConstructor.byPageForTitle(pageNum, lastSearchedItem);
    fetchReposByQueryRequest(query);
  };

  const findRepoByTitle = (title) => {
    const query = queryConstructor.byTitle(title);
    fetchReposByQueryRequest(query);
    addSearchHistoryItem(title);
  };

  if (Boolean(repos.error)) {
    enqueueSnackbar(repos.error.message, { variant: "error" });
  }

  return (
    <Container maxWidth="sm" className={classes.rootContainer}>
      <SearchBar
        findRepoByTitle={findRepoByTitle}
        reposNumber={repos.total}
        responseTime={repos.responseTime}
        pending={repos.pending}
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
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </Container>
  );
};

const mapDispatchToProps = { fetchReposByQueryRequest, addSearchHistoryItem };

const mapStateToProps = (state) => ({
  repos: state.repos,
  lastSearchedItem: lastSearchSelector(state),
  searchHistory: state.searchHistory,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
