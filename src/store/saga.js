import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
} from "./actions";
import parsePaginationHeader from "../helpers/paginationParser";

import * as reposService from "../services";

export default function* rootSaga() {
  yield takeEvery(fetchReposByQueryRequest, function* ({ payload: query }) {
    try {
      const result = yield call(reposService.fetchReposByQuery, query);
      yield put(
        fetchReposByQuerySuccess({
          data: result.data.items,
          pagination: parsePaginationHeader(result.headers.link),
        })
      );
    } catch (error) {
      yield console.log(error);
    }
  });
}
