import React from "react";
import { FlatList, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";

const TodayTasks = props => {
	const tailwind = useTailwind();
	const { currentJobs } = useSelector(state => state["jobs"]);

	return (
		<View style={tailwind("flex grow justify-center my-6")}>
			<FlatList
				keyExtractor={item => item._id.toString()}
				data={currentJobs}
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
	);
};

TodayTasks.propTypes = {};

export default TodayTasks;
