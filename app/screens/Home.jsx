import React, { useCallback, useEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import TodayTasks from "../containers/TodayTasks";
import AllTasks from "../containers/AllTasks";
import { subscribe, unsubscribe } from "../store/features/jobs/actions";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { THEME } from "../constants";
import { Badge } from "react-native-elements";
import SwitchToggle from "react-native-switch-toggle";
import { updateDriverProfile } from "../store/features/drivers/actions";

const Home = props => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const { id, isOnline } = useSelector(state => state["drivers"].driver);

	const toggleSwitch = () => {
		dispatch(updateDriverProfile({ id, isOnline: !isOnline }))
			.unwrap()
			.then(res => console.log(res))
			.catch(err => console.log(err.message));
	};
	const {
		isAuthenticated,
		driver: { id: driverId, firstname, lastname }
	} = useSelector(state => state["drivers"]);
	const { completedJobs, currentJobs } = useSelector(state => state["jobs"]);

	const renderScene = SceneMap({
		today: TodayTasks,
		all: AllTasks
	});

	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: THEME.PRIMARY }}
			style={{ backgroundColor: "transparent" }}
			labelStyle={{ color: "black" }}
			renderBadge={({ route }) => route.key === "today" && <Badge value={currentJobs ? currentJobs.length : 0} status='success' />}
			pressColor={"transparent"}
		/>
	);

	const [routes] = React.useState([
		{ key: "today", title: "Today's Tasks" },
		{ key: "all", title: "All Tasks" }
	]);

	useFocusEffect(
		useCallback(() => {
			dispatch(subscribe(driverId))
				.then(jobs => console.log(jobs))
				.catch(err => alert(err.message));
			return () => dispatch(unsubscribe());
		}, [isFocused])
	);

	return (
		<View style={tailwind("bg-white md:mx-32 py-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<TabView
				renderTabBar={renderTabBar}
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
				initialLayout={{ width: layout.width }}
			/>
			<View style={tailwind("flex items-center mb-5")}>
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
