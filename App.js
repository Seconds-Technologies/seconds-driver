import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./app/navigation/AppNavigator";
import { THEME } from "./app/constants";
import * as Sentry from "@sentry/react-native";
import { ENV_MODE } from "@env"

Sentry.init({
	dsn: "https://036eecf499404481a966cf1799bd435b@o1163923.ingest.sentry.io/6252556",
	enableNative: ENV_MODE !== 'local',
	enableInExpoDevelopment: true,
	debug: true,
	environment: ENV_MODE,
	release: 'driver-profile-image'// If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const App = () => {

	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: THEME.PRIMARY
		}
	};

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<TailwindProvider utilities={utilities}>
					<NavigationContainer theme={MyTheme}>
						<AppNavigator />
					</NavigationContainer>
				</TailwindProvider>
			</PersistGate>
		</Provider>
	);
};

export default Sentry.wrap(App);
