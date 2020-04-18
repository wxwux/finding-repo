import { takeEvery, call, put, fork } from "redux-saga/effects";
import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchSingleRepoSuccess,
  fetchSingleRepoRequest,
  fetchReadmeRequest,
  fetchReadmeSuccess
} from "./actions";
import { Pagination } from "../helpers/pagination";

import * as reposService from "../services";

const repos = function* () {
  yield takeEvery(fetchReposByQueryRequest, function* ({ payload: query }) {
    try {
      const result = yield call(reposService.fetchReposByQuery, query);
      const pagination = new Pagination(result.headers.link);
      yield put(
        fetchReposByQuerySuccess({
          data: result.data.items,
          pagination: pagination.generate(),
        })
      );
    } catch (error) {
      yield console.log(error);
    }
  });
};

const singleRepo = function* () {
  yield takeEvery(fetchSingleRepoRequest, function* ({ payload: repoInfo }) {
    try {
      const result = yield call(
        reposService.fetchRepoByOwnerAndTitle,
        repoInfo.owner,
        repoInfo.title
      );
      yield put(fetchSingleRepoSuccess(result.data));
    } catch (error) {
      yield console.log(error);
    }
  });
};


const readme = function* () {
  yield takeEvery(fetchReadmeRequest, function* ({ payload: repoInfo }) {
    try {
      const result = yield call(
        reposService.fetchDetailsByOwnerAndTitle,
        repoInfo.owner,
        repoInfo.title,
        "readme"
      );
      yield put(fetchReadmeSuccess(result.data));
    } catch (error) {
      yield console.log(error);
    }
  });
};


export default function* rootSaga() {
  yield fork(repos);
  yield fork(singleRepo);
  yield fork(readme);
}
