import {
  takeEvery,
  takeLatest,
  call,
  put,
  fork,
  take,
  all,
} from "redux-saga/effects";
import {
  fetchReposByQueryRequest,
  fetchReposByQuerySuccess,
  fetchReposByQueryFailure,
  fetchSingleRepoSuccess,
  fetchSingleRepoRequest,
  fetchSingleRepoFailure,
  fetchReadmeRequest,
  fetchReadmeSuccess,
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

const singleRepo = function* () {
  yield takeEvery(fetchSingleRepoRequest, function* ({ payload: repoInfo }) {
    try {
      const { owner, title } = repoInfo;

      const [repo, readme] = yield all([
        call(reposService.fetchRepoByOwnerAndTitle, owner, title),
        call(reposService.fetchDetailsByOwnerAndTitle, owner, title, "readme"),
      ]);

      // console.log("owner, title", repo, readme);

      yield put(fetchSingleRepoSuccess(repo.data));
      yield put(fetchReadmeSuccess(readme.data));
      // yield
      // yield put(
      //   fetchReadmeRequest({
      //     owner: repoInfo.owner,
      //     title: repoInfo.title,
      //   })
      // );
    } catch (error) {
      const errorObject = generateErrorObject(error);
      yield put(fetchSingleRepoFailure(errorObject));
    }
  });
};

// const readme = function* () {
//   try {
//     const { repoInfo } = yield take(fetchReadmeRequest);
//     const result = yield call(
//       reposService.fetchDetailsByOwnerAndTitle,
//       repoInfo.owner,
//       repoInfo.title,
//       "readme"
//     );
//     yield put(fetchReadmeSuccess(result.data));
//   } catch (error) {
//     console.log(error);
//   }

//   // yield takeEvery(fetchReadmeRequest, function* ({ payload: repoInfo }) {
//   //   try {
//   //     const result = yield call(
//   //       reposService.fetchDetailsByOwnerAndTitle,
//   //       repoInfo.owner,
//   //       repoInfo.title,
//   //       "readme"
//   //     );
//   //     yield put(fetchReadmeSuccess(result.data));
//   //   } catch (error) {
//   //     yield console.log(error);
//   //   }
//   // });
// };

export default function* rootSaga() {
  yield fork(repos);
  yield fork(singleRepo);
}
