import { cloneArray } from "../arrays";

it("it clones the array", () => {
  const array = [1, 2, 3];
  const clonedArray = cloneArray(array).get();
  const theSameArray = Object.is(array, clonedArray);

  expect(theSameArray).toBe(false);
});

it("it removes item from the array", () => {
  const array = [1, 2, 3];
  const clonedArray = cloneArray(array).removeItem(2).get();
  const result = [1, 3];

  expect(clonedArray).toStrictEqual(result);
});

it("it returns cloned array when the wrong value passed", () => {
  const array = [1, 2, 3];
  expect(cloneArray(array).removeItem(NaN).get()).toStrictEqual(array);
  expect(cloneArray(array).removeItem(4).get()).toStrictEqual(array);
  expect(cloneArray(array).removeItem().get()).toStrictEqual(array);
});
