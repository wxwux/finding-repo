import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
} from "./actions";
import * as reposService from "../services";

export default function* rootSaga() {
  yield takeEvery(fetchReposRequest, function* ({ payload: reposTitle }) {
    try {
      const result = yield call(reposService.fetchReposByTitle, reposTitle);
      yield put(fetchReposSuccess(result));
    } catch (error) {
      yield console.log("error");
    }
  });
}
