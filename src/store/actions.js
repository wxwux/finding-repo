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

export const fetchSingleRepoSuccess = createAction("FETCH_SINGLE_REPO_SUCCESS");
export const fetchSingleRepoRequest = createAction("FETCH_SINGLE_REPO_REQUEST");
export const fetchSingleRepoFailure = createAction("FETCH_SINGLE_REPO_FAILURE");

export const fetchReadmeSuccess = createAction("FETCH_README_SUCCESS");
export const fetchReadmeRequest = createAction("FETCH_README_REQUEST");
export const fetchReadmeFailure = createAction("FETCH_README_FAILURE");
