import React from "react";
import { FlatList, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";

const AllTasks = props => {
	const tailwind = useTailwind();
	const { completedJobs } = useSelector(state => state["jobs"]);

	return (
		<View style={tailwind("bg-white md:mx-32 py-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<View style={tailwind("flex grow justify-center mt-5")}>
				<FlatList
					keyExtractor={item => item._id.toString()}
					data={completedJobs}
					renderItem={({ item, index }) => (
						<OrderCard key={index} item={item} bgStyle={"bg-completed-50"} textStyle={"text-completed-600"} />
					)}
				/>
			</View>
		</View>
	);
};

export default AllTasks;
