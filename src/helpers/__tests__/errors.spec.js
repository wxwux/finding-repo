import { generateErrorObject } from "../errors";

const error = {
  response: {
    status: 404,
  },
};

it("returns proper error obj", () => {
  const errorObj = generateErrorObject(error);
  const result = {
    message: "Item hasn't been found",
    status: 404,
  };

  expect(errorObj).toMatchObject(result);
});

it("returns unknown error", () => {
  const result = {
    message: "Unknown error",
    status: 520,
  };
  expect(generateErrorObject(undefined)).toMatchObject(result);
  expect(generateErrorObject({})).toMatchObject(result);
  expect(generateErrorObject(NaN)).toMatchObject(result);
  expect(generateErrorObject("")).toMatchObject(result);
});




