import { takeLatest, call, put, fork, select } from "redux-saga/effects";

import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchReposByQueryFailure,
  addSearchHistoryItem,
  getReposFromCache,
  clearReposCache,
} from "../actions";

import {
  generateErrorObject,
  emulateResponseStatusError,
} from "../../helpers/errors";
import { Pagination } from "../../helpers/pagination";
import { getParamFromQueryString } from "../../helpers/queries";

import * as reposService from "../../services/repos";

const searchHistory = function* (query) {
  if (query.type !== "title") return;

  const [title] = query.originalValues;
  yield put(addSearchHistoryItem(title));
};

const pageSelector = (state, page) => state.repos.storage[page];

export const requestForRepos = function* (query) {
  try {
    const result = yield call(reposService.fetchReposByQuery, query);

    if (result.data.items.length === 0)
      yield call(emulateResponseStatusError(204));

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
  } catch (error) {
    const errorObject = generateErrorObject(error);
    yield put(fetchReposByQueryFailure(errorObject));
  }
};

const getCachedItems = function* (query) {
  const page = getParamFromQueryString(query.toString(), "page");
  const items = yield select(pageSelector, page);
  const itemsChached = items && items.data.length > 0;

  return {
    areFound: Boolean(itemsChached),
    items: items,
  };
};

export const reposList = function* (query) {
  try {
    const cachedItems = yield call(getCachedItems, query);

    if (query.type === "title") {
      yield put(clearReposCache());
    }

    if (cachedItems.areFound === false) {
      yield fork(requestForRepos, query);
    } else {
      yield put(
        getReposFromCache({
          data: cachedItems.items.data,
          pagination: cachedItems.items.pagination,
        })
      );
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
