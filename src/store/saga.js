import { takeLatest, take, call, put, fork } from "redux-saga/effects";
import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchReposByQueryFailure,
  fetchSingleRepoSuccess,
  fetchSingleRepoRequest,
  fetchSingleRepoFailure,
  fetchReadmeRequest,
  fetchReadmeSuccess,
  fetchReadmeFailure,
  addSearchHistoryItem,
} from "./actions";
import { Pagination } from "../helpers/pagination";
import { generateErrorObject } from "../helpers/errors";

import * as reposService from "../services";

const readme = function* (repoInfo) {
  const { owner, title } = repoInfo;
  try {
    const result = yield call(
      reposService.fetchDetailsByOwnerAndTitle,
      owner,
      title,
      "readme"
    );
    yield put(fetchReadmeSuccess(result.data));
  } catch (error) {
    const errorObject = generateErrorObject(error);
    yield put(fetchReadmeFailure(errorObject));
  }
};


const searchHistory = function* (query) {
  const [title] = query.originalValues;
  yield put(addSearchHistoryItem(title));
};

const reposList = function* (query) {
  try {
    const result = yield call(reposService.fetchReposByQuery, query);
    const pagination = new Pagination(result.headers.link);
    yield put(
      fetchReposByQuerySuccess({
        data: result.data.items,
        pagination: pagination.generate(),
        total: result.data["total_count"],
        responseTime: result.responseTime,
      })
    );
    if (query.type === "title") {
      yield call(searchHistory, query);
    }
  } catch (error) {
    const errorObject = generateErrorObject(error);
    yield put(fetchReposByQueryFailure(errorObject));
  }
};


const repos = function* () {
  yield takeLatest(fetchReposByQueryRequest, function* ({ payload: query }) {
    yield call(reposList, query);
  });
};

const singleRepoSaga = function* (repoInfo) {
  try {
    const { owner, title } = repoInfo;
    const result = yield call(
      reposService.fetchRepoByOwnerAndTitle,
      owner,
      title
    );
    yield put(fetchSingleRepoSuccess(result.data));
  } catch (error) {
    const errorObject = generateErrorObject(error);
    yield put(fetchSingleRepoFailure(errorObject));
  }
};

const singleRepo = function* () {
  yield takeLatest(fetchSingleRepoRequest, function* ({ payload: repoInfo }) {
    yield fork(readme, repoInfo);
    yield fork(singleRepoSaga, repoInfo);
  });
};

export default function* rootSaga() {
  yield fork(repos);
  yield fork(singleRepo);
}
