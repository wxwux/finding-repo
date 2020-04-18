import { createSelector } from "reselect";

const searchHistory = (state) => state.searchHistory;

export const lastSearchSelector = createSelector(
  searchHistory,
  (history) => history[0]
);
