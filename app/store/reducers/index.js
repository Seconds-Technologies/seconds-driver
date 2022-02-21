import {combineReducers} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, PURGE} from "redux-persist";
import driverReducer from '../features/drivers/driverSlice';
import jobsReducer from '../features/jobs/jobSlice';
import { deleteKey } from "../../services/keyStore";

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
	whitelist: ['drivers'] // only navigation will be persisted
};

const appReducer = combineReducers({
	drivers: driverReducer,
	jobs: jobsReducer
	// [secondsServer.reducerPath]: secondsServer.reducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		deleteKey("credentials")
		state = undefined;
	}
	return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer);
