import { takeLatest, call, put } from "redux-saga/effects";

import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchReposByQueryFailure,
  addSearchHistoryItem,
} from "../actions";

import {
  generateErrorObject,
  emulateResponseStatusError,
} from "../../helpers/errors";
import { Pagination } from "../../helpers/pagination";

import * as reposService from "../../services";

const searchHistory = function* (query) {
  if (query.type !== "title") return;

  const [title] = query.originalValues;
  yield put(addSearchHistoryItem(title));
};

export const reposList = function* (query) {
  try {
    const result = yield call(reposService.fetchReposByQuery, query);
    const pagination = new Pagination(result.headers.link);

    if (result.data.items.length === 0) {
      yield call(emulateResponseStatusError(204));
    } else {
      yield put(
        fetchReposByQuerySuccess({
          data: result.data.items,
          pagination: pagination.generate(),
          total: result.data["total_count"],
          responseTime: result.responseTime,
        })
      );
      yield call(searchHistory, query);
    }
  } catch (error) {
    const errorObject = generateErrorObject(error);
    yield put(fetchReposByQueryFailure(errorObject));
  }
};

export default function* () {
  yield takeLatest(fetchReposByQueryRequest, function* ({ payload: query }) {
    yield call(reposList, query);
  });
}
