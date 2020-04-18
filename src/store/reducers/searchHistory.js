import { handleActions } from "redux-actions";
import { addSearchHistoryItem } from "../actions";
import { cloneArrayAndRemoveItem } from "../../helpers/array";

const searchHistoryReducer = handleActions(
  {
    [addSearchHistoryItem]: (state, action) => {
      const item = action.payload;
      const itemAlreadyExists = state.includes(item);

      if (itemAlreadyExists) {
        const stateWithoutItem = cloneArrayAndRemoveItem(state, item);
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
