import { createAction } from "redux-actions";

export const fetchReposByQuerySuccess = createAction(
  "FETCH_REPOS_BY_QUERY_SUCCESS"
);
export const fetchReposByQueryRequest = createAction(
  "FETCH_REPOS_BY_QUERY_REQUEST"
);
export const fetchReposByQueryFailure = createAction(
  "FETCH_REPOS_BY_QUERY_FAILURE"
);

export const getReposFromCache = createAction(
  "GET_REPOS_FROM_CACHE"
)

export const clearReposCache = createAction(
  "CLEAR_REPOS_CACHE"
)

export const fetchSingleRepoSuccess = createAction("FETCH_SINGLE_REPO_SUCCESS");
export const fetchSingleRepoRequest = createAction("FETCH_SINGLE_REPO_REQUEST");
export const fetchSingleRepoFailure = createAction("FETCH_SINGLE_REPO_FAILURE");

export const fetchReadmeSuccess = createAction("FETCH_README_SUCCESS");
export const fetchReadmeRequest = createAction("FETCH_README_REQUEST");
export const fetchReadmeFailure = createAction("FETCH_README_FAILURE");

export const addSearchHistoryItem = createAction("ADD_SEARCH_HISTORY_ITEM");

export const fetchUserRequest = createAction("FETCH_USER_REQUEST");
export const fetchUserSuccess = createAction("FETCH_USER_SUCCESS");
export const fetchUserFailure = createAction("FETCH_USER_FAILURE");

export const fetchTokenRequest = createAction("FETCH_TOKEN_REQUEST");
export const fetchTokenSuccess = createAction("FETCH_TOKEN_SUCCESS");
export const fetchTokenFailure = createAction("FETCH_TOKEN_FAILURE");

export const logoutUser = createAction("LOGOUT_USER");

