import { takeLatest, call, put, select } from "redux-saga/effects";

import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchReposByQueryFailure,
  addSearchHistoryItem,
  getReposFromCache,
  clearReposCache
} from "../actions";

import {
  generateErrorObject,
  emulateResponseStatusError,
} from "../../helpers/errors";
import { Pagination } from "../../helpers/pagination";
import { getParamFromQueryString } from "../../helpers/queries";

import * as reposService from "../../services";

const searchHistory = function* (query) {
  if (query.type !== "title") return;

  const [title] = query.originalValues;
  yield put(addSearchHistoryItem(title));
};

const pageSelector = (state, page) => state.repos.storage[page];

export const reposList = function* (query) {
  try {
    const page = getParamFromQueryString(query.toString(), "page");
    const items = yield select(pageSelector, page);
    const itemsChached = items && items.data.length > 0;

    if (query.type === "title") {
      yield put(clearReposCache());
    }

    if (Boolean(itemsChached) === false) {
      const result = yield call(reposService.fetchReposByQuery, query);
      if (result.data.items.length === 0) {
        yield call(emulateResponseStatusError(204));
      } else {
        const pagination = new Pagination(result.headers.link);
        const paginationObject = pagination.generate();
        const activeLink = paginationObject.active;

        yield put(
          fetchReposByQuerySuccess({
            data: result.data.items,
            storage: {
              [activeLink]: {
                data: result.data.items,
                pagination: paginationObject,
              },
            },
            pagination: paginationObject,
            total: result.data["total_count"],
            responseTime: result.responseTime,
          })
        );
        yield call(searchHistory, query);
      }
    } else {
      yield put(
        getReposFromCache({
          data: items.data,
          pagination: items.pagination,
        })
      );
    }
  } catch (error) {
    console.log(error);

    const errorObject = generateErrorObject(error);
    yield put(fetchReposByQueryFailure(errorObject));
  }
};

export default function* () {
  yield takeLatest(fetchReposByQueryRequest, function* ({ payload: query }) {
    yield call(reposList, query);
  });
}
