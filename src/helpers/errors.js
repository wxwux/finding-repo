import i18n from "../../i18n";
export class ErrorObject {
  constructor(status, type = "error") {
    this.message = i18n.error(status);
    this.status = status;
    this.type = type;
  }
}

export const emulateResponseStatusError = (status) => {
  const errorObject = {
    response: {
      status: status,
    },
  };

  throw errorObject;
};

export const generateErrorObject = (error) => {
  if (!error || !error.response) {
    console.warn("no response object was provided");
    return new ErrorObject(520);
  }

  const status = error.response.status;

  switch (status) {
    case 204:
      return new ErrorObject(status, "warning");
    case 422:
      return new ErrorObject(status);
    case 523:
      return new ErrorObject(status);
    case 404:
      return new ErrorObject(status);
    case 401:
      return new ErrorObject(status);
    default:
      return new ErrorObject(520);
  }
};
