import { takeLatest, call, put, fork } from "redux-saga/effects";
import {
  fetchSingleRepoSuccess,
  fetchSingleRepoRequest,
  fetchSingleRepoFailure,
  fetchReadmeSuccess,
  fetchReadmeFailure,
} from "../actions";
import { generateErrorObject } from "../../helpers/errors";

import * as reposService from "../../services/repos";

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

export default function* () {
  yield takeLatest(fetchSingleRepoRequest, function* ({ payload: repoInfo }) {
    yield fork(readme, repoInfo);
    yield fork(singleRepoSaga, repoInfo);
  });
}
