import {configureStore} from '@reduxjs/toolkit'
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import rootReducer from "./reducers";
import { setupListeners } from '@reduxjs/toolkit/query'
import logger from 'redux-logger'

const store = configureStore({
	reducer: rootReducer,
	devTools: __DEV__,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store);

setupListeners(store.dispatch) // NOTE
export default store// this addition
