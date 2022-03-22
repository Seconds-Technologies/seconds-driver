import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverCall, setApiKey, setTokenHeader } from "../api";
import { getValueFor } from "../services/keyStore";
import AuthStackScreen from "./AuthStack";
import DrawerScreen from "./drawer";
import { logger } from "react-native-logs";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { updatePermissions } from "../store/features/permissions/permissionsSlice";
import * as TaskManager from "expo-task-manager";
import { TASK_FETCH_LOCATION } from "../constants";
import * as Sentry from "@sentry/react-native";

const log = logger.createLogger();
const RootStack = createNativeStackNavigator();

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
	if (error) {
		console.error(error);
		return;
	}
	const creds = await getValueFor("credentials");
	const [location] = locations;
	Sentry.addBreadcrumb({
		category: "location",
		message: "Fetching driver location:" + location,
		level: Sentry.Severity.Info,
	});
	try {
		if (creds) {
			const { driverId } = JSON.parse(creds)
			Sentry.addBreadcrumb({
				category: "credentials",
				message: creds,
				level: Sentry.Severity.Info,
			});
			console.log(driverId);
			const status = await serverCall("PATCH", "/server/driver/update-location", location.coords, { params: { driverId: driverId } }); // you should use post instead of get to persist data on the backend
			console.log(status);
		}
	} catch (err) {
		console.error(err);
	}
});

const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator screenOptions={{ headerShown: false }}>
		{userToken ? <RootStack.Screen name={"App"} component={DrawerScreen} /> : <RootStack.Screen name={"Auth"} component={AuthStackScreen} />}
	</RootStack.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [notification, setNotification] = useState(false);
	const { isAuthenticated, driver } = useSelector(state => state["drivers"]);
	const [errorMsg, setErrorMsg] = useState(null);
	const { foregroundLocation, backgroundLocation } = useSelector(state => state["permissions"]);
	const dispatch = useDispatch();

	async function registerForegroundLocation() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}
		return status;
	}

	async function registerBackgroundLocation() {
		return await Location.requestBackgroundPermissionsAsync();
	}

	useEffect(() => {
		registerForegroundLocation().then(() => {
			dispatch(updatePermissions({ foregroundLocation: true }));
			!backgroundLocation &&
				Alert.alert(
					"Important!",
					"We need access to your location while the app is running in background to ensure customers receive accurate tracking updates for their deliveries. Please enable this on the next window",
					[
						{
							text: "OK",
							onPress: () =>
								registerBackgroundLocation().then(({ status }) => {
									console.log("STATUS", status);
									status === "granted" && dispatch(updatePermissions({ backgroundLocation: true }));
								})
						}
					]
				);
		});
	}, []);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			console.log(driver.id);
			// 1 define the task passing its name and a callback that will be called whenever the location changes
			/*let token = (await Notifications.getExpoPushTokenAsync()).data;
			log.info(token);*/
			const result = await getValueFor("credentials");
			if (result) {
				const { apiKey, token } = JSON.parse(result);
				if (token && apiKey) {
					await setApiKey(apiKey);
					await setTokenHeader(token);
				}
			}
			setIsLoading(false);
		})();
	}, [driver.id]);

	return isLoading ? <Loading loading={isLoading} /> : <RootStackScreen userToken={isAuthenticated} />;
};

export default AppNavigator;
