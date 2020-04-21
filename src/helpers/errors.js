export class ErrorObject {
  constructor(message, status) {
    this.message = message;
    this.status = status;
  }
}

export const generateErrorObject = (error) => {
  const responseObj = error.response;

  if (!responseObj) {
    console.warn("no response object was provided");
    return new ErrorObject("Unknown error", 520);
  }

  const status = responseObj.status;

  switch (status) {
    case 422:
      return new ErrorObject("Entered the wrong value", status);
    case 523:
      return new ErrorObject(
        "You've reached requests limit of Github API",
        status
      );
    case 404:
      return new ErrorObject("Item hasn't been found", status);
    default:
      return new ErrorObject("Unknown error", 520);
  }
};
