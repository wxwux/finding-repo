import searchHistoryReducer from "../searchHistoryReducer";
import { addSearchHistoryItem } from "../../actions";

it("adds used item to the first position", () => {
  const initialState = ["one", "two", "three"];
  const action = addSearchHistoryItem("three");
  const result = ["three", "one", "two"];

  expect(searchHistoryReducer(initialState, action)).toStrictEqual(result);
});
