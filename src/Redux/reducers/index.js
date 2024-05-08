import { combineReducers } from "redux";
import userdataReducer from './userdataReducer'

const reducers = combineReducers({
    usersData: userdataReducer
    
});

export default reducers;