import { fork } from "redux-saga/effects";

import repos from "./reposSaga";
import singleRepo from "./singleRepoSaga";

export default function* rootSaga() {
  yield fork(repos);
  yield fork(singleRepo);
}
