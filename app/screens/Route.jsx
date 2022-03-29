import React, { useEffect, useMemo } from "react";
import { FlatList, View } from "react-native";
import OrderCard from "../components/OrderCard";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";

const Route = ({ route }) => {
	const tailwind = useTailwind();
	const { routeJobs } = useSelector(state => state["jobs"]);

	const jobs = useMemo(() => {
		return routeJobs.filter(({ routeOptimization: { routeId } }) => routeId === route.key);
	}, [routeJobs]);

	useEffect(() => {
		jobs.forEach(item => console.log(item.status));
	}, [jobs]);

	return (
		<View style={tailwind("bg-white md:mx-32 py-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<View style={tailwind("flex grow justify-center mt-5")}>
				<FlatList
					keyExtractor={item => item._id.toString()}
					data={jobs.sort((a, b) => a["routeOptimization"].priority > b["routeOptimization"].priority)}
					renderItem={({ item, index }) => (
						<OrderCard
							key={index}
							item={item}
							bgStyle={`bg-${item.status.toLowerCase()}-100`}
							textStyle={`text-${item.status.toLowerCase()}-600`}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default Route;
