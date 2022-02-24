import React, {useEffect} from 'react';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {Provider} from "react-redux";
import store, {persistor} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
import AppNavigator from "./app/navigation/AppNavigator";
import Constants from 'expo-constants';
import { THEME } from "./app/constants";

export default function App() {

	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: THEME.PRIMARY,
		},
	};

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<TailwindProvider utilities={utilities}>
					<NavigationContainer theme={MyTheme}>
						<AppNavigator/>
					</NavigationContainer>
				</TailwindProvider>
			</PersistGate>
		</Provider>
	);
}
