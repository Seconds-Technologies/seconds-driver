import {combineReducers} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, PURGE} from "redux-persist";
import {secondsServer} from "../../api/server";
import currentDriver from './currentDriver';
import driverReducer from '../features/drivers/driverSlice';

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
	whitelist: ['drivers'] // only navigation will be persisted
};

const appReducer = combineReducers({
	drivers: driverReducer
	// [secondsServer.reducerPath]: secondsServer.reducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		// storage.removeItem('persist:otherKey')
		state = undefined;
	}
	return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer);
