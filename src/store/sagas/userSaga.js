import { fork, put, takeLatest, call } from "redux-saga/effects";
import { generateErrorObject } from "../../helpers/errors";

import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from "../actions";

import { getUser } from "../../services/user";

const userSaga = function* () {
  yield takeLatest(fetchUserRequest, function* () {
    try {
      const result = yield call(getUser);
      yield put(fetchUserSuccess(result.data));
      console.log("userresult", result);
    } catch (error) {
      const errorObject = generateErrorObject(error);
      yield put(fetchUserFailure(errorObject));
    }
  });
};

export default function* () {
  yield fork(userSaga);
}
