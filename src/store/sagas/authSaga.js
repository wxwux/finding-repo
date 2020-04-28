import { fork, put, takeLatest, call } from "redux-saga/effects";

import { getParamFromQueryString } from "../../helpers/queries";
import {
  generateErrorObject,
  emulateResponseStatusError,
} from "../../helpers/errors";

import {
  fetchTokenRequest,
  fetchTokenSuccess,
  fetchTokenFailure,
  logoutUser,
} from "../actions";
import { getAccessToken } from "../../services/auth";

const tokenSaga = function* () {
  yield takeLatest(fetchTokenRequest, function* ({ payload: code }) {
    try {
      const result = yield call(getAccessToken, code);
      const token = getParamFromQueryString(result.data, "access_token");
      if (token) {
        yield put(fetchTokenSuccess(token));
        localStorage.setItem("token", token);
        window.location.replace("/");
      } else {
        yield call(emulateResponseStatusError(401));
      }
    } catch (error) {
      const errorObject = generateErrorObject(error);
      yield put(fetchTokenFailure(errorObject));
    }
  });
};

const logout = function* () {
  yield takeLatest(logoutUser, function () {
    localStorage.removeItem("token");
    window.location.replace("/");
  });
};

export default function* () {
  yield fork(tokenSaga);
  yield logout(logout);
}
