import { createAction } from "redux-actions";

export const fetchReposSuccess = createAction("FETCH_REPOS_SUCCESS");
export const fetchReposRequest = createAction("FETCH_REPOS_REQUEST");
export const fetchReposFailure = createAction("FETCH_REPOS_FAILURE");