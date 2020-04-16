import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
} from "./actions";
import {Pagination} from "../helpers/pagination";

import * as reposService from "../services";

export default function* rootSaga() {
  yield takeEvery(fetchReposByQueryRequest, function* ({ payload: query }) {
    try {
      const result = yield call(reposService.fetchReposByQuery, query);
      const pagination = new Pagination(result.headers.link);
      yield put(
        fetchReposByQuerySuccess({
          data: result.data.items,
          pagination: pagination.generate()
        })
      );
    } catch (error) {
      yield console.log(error);
    }
  });
}
