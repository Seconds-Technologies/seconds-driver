import React, { useCallback, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import TodayTasks from "../containers/TodayTasks";
import TodayRoutes from "../containers/TodayRoutes";
import { subscribe, unsubscribe } from "../store/features/jobs/actions";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { DRIVER_STATUS, JOB_STATUS, THEME } from "../constants";
import { Badge } from "react-native-elements";
import SwitchToggle from "react-native-switch-toggle";
import { updateDriverProfile } from "../store/features/drivers/actions";
import { pushLocationUpdates, stopLocationUpdates } from "../helpers";

const Home = props => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "tasks", title: "Tasks" },
		{ key: "routes", title: "Routes" }
	]);
	const {
		driver: { id: driverId, isOnline }
	} = useSelector(state => state["drivers"]);
	const { allJobs, currentJobs } = useSelector(state => state["jobs"]);
	const { backgroundLocation } = useSelector(state => state["permissions"]);

	const renderScene = SceneMap({
		tasks: TodayTasks,
		routes: TodayRoutes
	});

	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: THEME.PRIMARY }}
			style={{ backgroundColor: "transparent" }}
			labelStyle={{ color: "black" }}
			renderBadge={({ route }) => route.key === "tasks" && <Badge value={currentJobs ? currentJobs.length : 0} status='success' />}
			pressColor={"transparent"}
		/>
	);
	const getStatus = useCallback(
		online => {
			let isBusy = allJobs.some(job => [JOB_STATUS.DISPATCHING.name, JOB_STATUS.EN_ROUTE.name].includes(job.status));
			return !online ? DRIVER_STATUS.OFFLINE : isBusy ? DRIVER_STATUS.BUSY : DRIVER_STATUS.AVAILABLE;
		},
		[allJobs]
	);

	const toggleSwitch = () => {
		dispatch(
			updateDriverProfile({
				id: driverId,
				isOnline: !isOnline,
				status: getStatus(!isOnline)
			})
		)
			.unwrap()
			.then(() => console.log("Profile updated successfully"))
			.catch(err => console.log(err.message));

	};

	useFocusEffect(
		useCallback(() => {
			dispatch(subscribe(driverId))
				.then(jobs => console.log(jobs))
				.catch(err => alert(err.message));
			return () => dispatch(unsubscribe());
		}, [isFocused])
	);

	useEffect(() => {
		if (backgroundLocation && isOnline) {
			pushLocationUpdates();
		} else {
			stopLocationUpdates();
		}
	}, [backgroundLocation, isOnline])

	return (
		<View style={tailwind("bg-white md:mx-32 py-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<TabView
				renderTabBar={renderTabBar}
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
				initialLayout={{ width: layout.width }}
			/>
			<View style={tailwind("flex items-center mb-3")}>
				<Text style={tailwind("text-lg")}>{isOnline ? "Online" : "Offline"}</Text>
				<SwitchToggle
					type={0}
					switchOn={isOnline}
					onPress={toggleSwitch}
					containerStyle={{
						marginTop: 16,
						width: 60,
						height: 30,
						borderRadius: 25,
						padding: 5
					}}
					circleStyle={{
						width: 20,
						height: 20,
						borderRadius: 16
					}}
					circleColorOff='#fff'
					circleColorOn='#fff'
					backgroundColorOn='#9bea85'
					backgroundColorOff='#C4C4C4'
				/>
			</View>
		</View>
	);
};

export default Home;
