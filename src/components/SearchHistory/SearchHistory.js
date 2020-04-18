import React from "react";
import { connect } from "react-redux";

const SearchHistoryItem = ({ title }) => {
  return <button>{title}</button>;
};

const SearchHistory = ({ searchHistory }) => {
  const historyItems = searchHistory.map((item) => (
    <SearchHistoryItem key={item} title={item}></SearchHistoryItem>
  ));
  return (
    <>
      <h3>Previous searches:</h3>
      <div>{historyItems}</div>
    </>
  );
};

const mapStateToProps = ({ searchHistory }) => ({ searchHistory });

export default connect(mapStateToProps)(SearchHistory);
