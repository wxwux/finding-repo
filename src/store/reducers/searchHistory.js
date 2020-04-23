import { handleActions } from "redux-actions";
import { addSearchHistoryItem } from "../actions";
import { cloneArray } from "../../helpers/arrays";

const searchHistoryReducer = handleActions(
  {
    [addSearchHistoryItem]: (state, action) => {
      const item = action.payload;
      const itemAlreadyExists = state.includes(item);

      if (itemAlreadyExists) {
        const stateWithoutItem = cloneArray(state).removeItem(item).get();
        stateWithoutItem.unshift(item);
        return stateWithoutItem;
      } else {
        return [item, ...state];
      }
    },
  },
  []
);

export default searchHistoryReducer;
