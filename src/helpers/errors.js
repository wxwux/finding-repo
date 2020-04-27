export class ErrorObject {
  constructor(message, status, type = "error") {
    this.message = message;
    this.status = status;
    this.type = type
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
    console.warn("no response object were provided");
    return new ErrorObject("Unknown error", 520);
  }

  const status = error.response.status;

  switch (status) {
    case 204:
      return new ErrorObject("Nothing was found", status, "warning");
    case 422:
      return new ErrorObject("Entered the wrong value", status);
    case 523:
      return new ErrorObject(
        "You've reached requests limit of Github API, retry in a minute",
        status
      );
    case 404:
      return new ErrorObject("Item hasn't been found", status);
    case 401:
      return new ErrorObject("Bad credentials was provided", status);
    default:
      return new ErrorObject("Unknown error", 520);
  }
};
