import { JOB_STATUS, TASK_FETCH_LOCATION } from "../constants";
import * as Location from "expo-location";

export const getColor = status => {
	switch (status) {
		case JOB_STATUS.NEW.name:
			return JOB_STATUS.NEW.colour;
		case JOB_STATUS.PENDING.name:
			return JOB_STATUS.PENDING.colour;
		case JOB_STATUS.DISPATCHING.name:
			return JOB_STATUS.DISPATCHING.colour;
		case JOB_STATUS.EN_ROUTE.name:
			return JOB_STATUS.EN_ROUTE.colour;
		case JOB_STATUS.COMPLETED.name:
			return JOB_STATUS.COMPLETED.colour;
		case JOB_STATUS.CANCELLED.name:
			return JOB_STATUS.CANCELLED.colour;
		default:
			return JOB_STATUS.UNKNOWN.colour;
	}
};

export function capitalize(str) {
	let start = str[0].toUpperCase();
	const lower = str.slice(1).toLowerCase();
	return start.concat(lower);
}

export function pushLocationUpdates() {
	Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
		accuracy: Location.Accuracy.Highest,
		distanceInterval: 1, // minimum change (in meters) between updates
		deferredUpdatesInterval: 20000, // minimum interval (in milliseconds) between updates
		// foregroundService is how you get the task to be updated as often as would be if the app was open
		foregroundService: {
			notificationTitle: "Using your location",
			notificationBody: "To turn off, go back to the app and toggle off your online status."
		}
	}).then(res => console.log("auto fetching started...."));
}

export function stopLocationUpdates() {
	Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then(
		value => value && Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION).then(r => console.log("auto fetching stopped"))
	);
}
