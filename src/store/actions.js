import { createAction } from "redux-actions";

export const fetchReposByQuerySuccess = createAction("FETCH_REPOS_BY_QUERY_SUCCESS");
export const fetchReposByQueryRequest = createAction("FETCH_REPOS_BY_QUERY_REQUEST");
export const fetchReposByQueryFailure = createAction("FETCH_REPOS_BY_QUERY_FAILURE");