import { fork } from "redux-saga/effects";

import repos from "./reposSaga";
import singleRepo from "./singleRepoSaga";
import authSaga from "./authSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield fork(repos);
  yield fork(singleRepo);
  yield fork(authSaga);
  yield fork(userSaga);
}
