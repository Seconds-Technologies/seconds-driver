import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {Provider} from "react-redux";
import store, {persistor} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
import AppNavigator from "./app/navigation/AppNavigator";
import Constants from 'expo-constants';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<TailwindProvider utilities={utilities}>
					<NavigationContainer>
						<AppNavigator/>
					</NavigationContainer>
				</TailwindProvider>
			</PersistGate>
		</Provider>
	);
}
