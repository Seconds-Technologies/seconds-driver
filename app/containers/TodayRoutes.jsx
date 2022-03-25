import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";
import RouteCard from "../components/RouteCard";

const TodayRoutes = props => {
	const tailwind = useTailwind();
	const { routeJobs } = useSelector(state => state["jobs"]);

	const unique = ({ routeOptimization: { routeId } }, index, self) => {
		return self.findIndex(item => item.routeOptimization.routeId === routeId) === index;
	};

	const routes = useMemo(() => {
		return routeJobs.filter(unique).map(route => {
			let orders = routeJobs.filter(item => item.routeOptimization.routeId === route.routeOptimization.routeId);
			return {
				routeId: route.routeOptimization.routeId,
				count: orders.length,
				orders,
				status: route.status
			};
		});
	}, [routeJobs]);

	return (
		<View style={tailwind("flex grow justify-center mt-5")}>
			<FlatList
				keyExtractor={item => item.routeId}
				data={routes}
				renderItem={({ item, index }) => (
					<RouteCard
						key={index}
						item={item}
						bgStyle={`bg-${item.status.toLowerCase()}-100`}
						textStyle={`text-${item.status.toLowerCase()}-600`}
					/>
				)}
			/>
		</View>
	);
};

export default TodayRoutes;
