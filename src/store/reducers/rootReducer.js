import transferNoteReducer from "./transferNoteReducer";

import { combineReducers } from "redux";
// import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    // firebase: firebaseReducer,
    transferNote : transferNoteReducer
  });
  
  export default rootReducer;
  