import {combineReducers} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, PURGE} from "redux-persist";
import driverReducer from '../features/drivers/driverSlice';
import jobsReducer from '../features/jobs/jobSlice';
import permissionsReducer from '../features/permissions/permissionsSlice'
import { deleteKey } from "../../services/keyStore";

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
	whitelist: ['drivers', 'jobs', 'permissions']
};

const appReducer = combineReducers({
	drivers: driverReducer,
	jobs: jobsReducer,
	permissions: permissionsReducer
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
