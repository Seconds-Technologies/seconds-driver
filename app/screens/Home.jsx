import React, { useCallback, useEffect } from "react";
import { Button, Text, View, useWindowDimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../store/actionTypes";
import { TabView, SceneMap } from "react-native-tab-view";
import TodayTasks from "../containers/TodayTasks";
import AllTasks from "../containers/AllTasks";
import { fetchJobs, subscribe, unsubscribe } from "../store/features/jobs/actions";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Menu from "../components/Menu";

const Home = props => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const {
		isAuthenticated,
		driver: { id: driverId, firstname, lastname }
	} = useSelector(state => state["drivers"]);

	const renderScene = SceneMap({
		today: TodayTasks,
		all: AllTasks
	});

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
		<View style={tailwind("bg-white md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl min-h-full")}>
			<View style={tailwind("flex flex-row justify-center my-5")}>
				<Text style={tailwind("text-center text-3xl")}>
					{firstname} {lastname}
				</Text>
			</View>
			<Menu />
			<TabView navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} initialLayout={{ width: layout.width }} />
		</View>
	);
};

export default Home;
