import { combineReducers } from "redux";

import repos from "./repos";
import singleRepo from "./singleRepo";
import readme from "./readme";

export default combineReducers({ repos, singleRepo, readme });
