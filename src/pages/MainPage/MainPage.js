import React from "react";
import { connect } from "react-redux";

import {
  fetchReposByQueryRequest,
  addSearchHistoryItem,
} from "../../store/actions";
import { queryConstructor } from "../../helpers/queries";
import { lastSearchSelector } from "../../store/selectors";
import { convertMsToHumanFormat } from "../../helpers/dateTime";

import SearchBar from "../../components/SearchBar";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import ReposList from "../../components/ReposList";
import SearchHistory from "../../components/SearchHistory";

import "./MainPage.css";

const MainPage = ({
  repos,
  fetchReposByQueryRequest,
  addSearchHistoryItem,
  lastSearchedItem,
}) => {
  const handlePaginationChange = (e, pageNum) => {
    const query = queryConstructor.byPageForTitle(pageNum, lastSearchedItem);
    fetchReposByQueryRequest(query);
  };

  const findRepoByTitle = (title, setTitle) => {
    const wasSearchedLately = title === lastSearchedItem;

    if (wasSearchedLately) {
      setTitle("");
      return;
    }

    const query = queryConstructor.byTitle(title);
    fetchReposByQueryRequest(query);

    addSearchHistoryItem(title);
    setTitle("");
  }

  return (
    <Container maxWidth="sm">
      <SearchBar findRepoByTitle={findRepoByTitle} />
      <div>
        <div>Repos has been found: {repos.total}</div>
        <div>
          Last request took: {convertMsToHumanFormat(repos.responseTime)}
        </div>
      </div>

      <SearchHistory />
      <div>
        <ReposList repos={repos} />
      </div>
      {repos.pagination.total && (
        <Pagination
          count={repos.pagination.total}
          onChange={handlePaginationChange}
          showFirstButton
          showLastButton
        />
      )}
    </Container>
  );
};

const mapDispatchToProps = { fetchReposByQueryRequest, addSearchHistoryItem };

const mapStateToProps = (state) => ({
  repos: state.repos,
  lastSearchedItem: lastSearchSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
