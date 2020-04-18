import { handleActions } from "redux-actions";
import { addSearchHistoryItem } from "../actions";

const searchHistoryReducer = handleActions(
  {
    [addSearchHistoryItem]: (state, action) => [action.payload, ...state],
  },
  []
);

export default searchHistoryReducer;
