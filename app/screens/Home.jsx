import React from 'react';
import {Button, Text, View, useWindowDimensions} from 'react-native';
import {useTailwind} from "tailwind-rn";
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT} from "../store/actionTypes";
import {TabView, SceneMap} from 'react-native-tab-view';

const Home = (props) => {
	const tailwind = useTailwind()
	const dispatch = useDispatch()
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const { firstname, lastname } = useSelector(state => state['drivers'].driver )

	const TodayTasks = () => (
		<View>
			<View style={tailwind('flex grow justify-center md:items-center my-6')}>
				<Text style={tailwind('text-3xl')}>Today's Tasks</Text>
			</View>
		</View>
	);

	const AllTasks = () => (
		<View>
			<View style={tailwind('flex grow justify-center md:items-center my-6')}>
				<Text style={tailwind('text-3xl')}>All Tasks</Text>
			</View>
		</View>
	);

	const renderScene = SceneMap({
		today: TodayTasks,
		all: AllTasks,
	})

	const [routes] = React.useState([
		{key: 'today', title: "Today's Tasks"},
		{key: 'all', title: 'All Tasks'},
	]);

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
