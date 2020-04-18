import { combineReducers } from "redux";

import repos from "./repos";
import singleRepo from "./singleRepo";
import readme from "./readme";
import searchHistory from "./searchHistory";

export default combineReducers({ repos, singleRepo, readme, searchHistory });
