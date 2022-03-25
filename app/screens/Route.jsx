import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import OrderCard from "../components/OrderCard";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";

const Route = ({ route }) => {
	const tailwind = useTailwind()
	const jobs = useSelector(state => state['jobs'].routeJobs.filter(({ routeOptimization: {routeId} }) => routeId === route.key))
	return (
		<View style={tailwind("bg-white md:mx-32 py-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<View style={tailwind("flex grow justify-center mt-5")}>
				<FlatList
					keyExtractor={item => item._id.toString()}
					data={jobs}
					renderItem={({ item, index }) => (
						<OrderCard key={index} item={item} bgStyle={"bg-completed-50"} textStyle={"text-completed-600"} />
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center"
	}
});

export default Route;
