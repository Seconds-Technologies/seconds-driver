import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey, setTokenHeader } from "../api";
import { getValueFor } from "../services/keyStore";
import AuthStackScreen from "./AuthStack";
import DrawerScreen from "./drawer";
import * as Notifications from "expo-notifications";
import { logger } from "react-native-logs";
import { updateDriverProfile } from "../store/features/drivers/actions";
import { Platform } from "react-native";
import { THEME } from "../constants";
import { isDevice } from "expo-device";

const log = logger.createLogger();
const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator screenOptions={{ headerShown: false }}>
		{userToken ? <RootStack.Screen name={"App"} component={DrawerScreen} /> : <RootStack.Screen name={"Auth"} component={AuthStackScreen} />}
	</RootStack.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [notification, setNotification] = useState(false);
	const { isAuthenticated, driver } = useSelector(state => state["drivers"]);
	const notificationListener = useRef();
	const responseListener = useRef();
	const dispatch = useDispatch();

	async function registerForPushNotificationsAsync() {
		let token;
		if (isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			return token
		} else {
			alert('Must use physical device for Push Notifications');
		}
	}

	/*useEffect(() => {
		registerForPushNotificationsAsync().then(token => isAuthenticated && dispatch(updateDriverProfile({ id: driver.id, devicePushToken: token })));
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: THEME.PRIMARY,
			}).then(() => log.info("Notification channel set!"));
		}
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			log.info(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, [])*/

	useEffect(() => {
		(async () => {
			setIsLoading(true);
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
	}, [isAuthenticated]);

	return isLoading ? <Loading loading={isLoading} /> : <RootStackScreen userToken={isAuthenticated} />;
};

export default AppNavigator;
