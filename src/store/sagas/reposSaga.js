import { takeLatest, call, put } from "redux-saga/effects";

import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchReposByQueryFailure,
  addSearchHistoryItem,
} from "../actions";

import { generateErrorObject } from "../../helpers/errors";
import { Pagination } from "../../helpers/pagination";

import * as reposService from "../../services";

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

export default function* () {
  yield takeLatest(fetchReposByQueryRequest, function* ({ payload: query }) {
    yield call(reposList, query);
  });
};
