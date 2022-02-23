import {configureStore} from '@reduxjs/toolkit'
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import logger from 'redux-logger';
import rootReducer from "./reducers";
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
	reducer: rootReducer,
	devTools: __DEV__,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat(logger)
})

export const persistor = persistStore(store);

setupListeners(store.dispatch) // NOTE
export default store// this addition
