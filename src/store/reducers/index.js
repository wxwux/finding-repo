import { combineReducers } from "redux";

import repos from "./reposReducer";
import singleRepo from "./singleRepoReducer";
import readme from "./readmeReducer";
import searchHistory from "./searchHistoryReducer";

export default combineReducers({ repos, singleRepo, readme, searchHistory });
