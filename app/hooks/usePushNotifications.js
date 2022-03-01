import useAsync from "react-use/lib/useAsync";
import { useRef, useState } from "react";
import {
	addNotificationReceivedListener,
	addNotificationResponseReceivedListener,
	AndroidImportance,
	removeNotificationSubscription,
	setNotificationChannelAsync,
	setNotificationHandler
} from "expo-notifications";
import { Platform } from "react-native";

setNotificationHandler({
	// eslint-disable-next-line @typescript-eslint/require-await
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

const usePushNotifications = ({ onTapNotification, notification }) => {
	const [notification, setNotification] = useState(null);
	const notificationListener = useRef();
	const responseListener = useRef();

	useAsync(async () => {
		notificationListener.current = addNotificationReceivedListener(setNotification);

		responseListener.current = addNotificationResponseReceivedListener(response => onTapNotification(response));

		if (Platform.OS === "android") {
			await setNotificationChannelAsync("default", {
				name: "default",
				importance: AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C"
			});
		}

		return () => {
			if (notificationListener.current) {
				removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				removeNotificationSubscription(responseListener.current);
			}
		};
	});

	return { notification };
};

export default usePushNotifications;
