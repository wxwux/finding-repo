import { takeEvery, takeLatest, call, put, fork } from "redux-saga/effects";
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
} from "./actions";
import { Pagination } from "../helpers/pagination";
import { generateErrorObject } from "../helpers/errors";

import * as reposService from "../services";

const repos = function* () {
  yield takeLatest(fetchReposByQueryRequest, function* ({ payload: query }) {
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
    } catch (error) {
      const errorObject = generateErrorObject(error);
      yield put(fetchReposByQueryFailure(errorObject));
    }
  });
};

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

const singleRepo = function* () {
  yield takeEvery(fetchSingleRepoRequest, function* ({ payload: repoInfo }) {
    try {
      const { owner, title } = repoInfo;
      const result = yield call(
        reposService.fetchRepoByOwnerAndTitle,
        owner,
        title
      );
      yield fork(readme, repoInfo);
      yield put(fetchSingleRepoSuccess(result.data));
    } catch (error) {
      const errorObject = generateErrorObject(error);
      yield put(fetchSingleRepoFailure(errorObject));
    }
  });
};


export default function* rootSaga() {
  yield fork(repos);
  yield fork(singleRepo);
}
