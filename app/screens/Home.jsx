import React, {useEffect} from 'react';
import {Button, Text, View, useWindowDimensions} from 'react-native';
import {useTailwind} from "tailwind-rn";
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT} from "../store/actionTypes";
import {TabView, SceneMap} from 'react-native-tab-view';
import TodayTasks from "../containers/TodayTasks";
import AllTasks from "../containers/AllTasks";
import {fetchJobs} from "../store/features/jobs";

const Home = (props) => {
	const tailwind = useTailwind()
	const dispatch = useDispatch()
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const {id: driverId, firstname, lastname} = useSelector(state => state['drivers'].driver)

	const renderScene = SceneMap({
		today: TodayTasks,
		all: AllTasks
	})

	const [routes] = React.useState([
		{key: 'today', title: "Today's Tasks"},
		{key: 'all', title: 'All Tasks'},
	]);

	useEffect(() => {
		dispatch(fetchJobs(driverId))
			.then(jobs => console.log(jobs))
			.catch(err => alert(err.message))
	}, [])

	return (
		<View style={tailwind('bg-white md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl min-h-full')}>
			<View style={tailwind('my-5')}>
				<Text style={tailwind('text-center text-4xl')}>{firstname} {lastname}</Text>
			</View>
			<TabView
				navigationState={{index, routes}}
				onIndexChange={setIndex}
				renderScene={renderScene}
				initialLayout={{width: layout.width}}
			/>
			<View style={tailwind('flex justify-center md:items-center my-6')}>
				<Button color={"red"} title={"Logout"} onPress={() => dispatch(({
					type: LOGOUT
				}))}/>
			</View>
		</View>
	);
}

export default Home;
