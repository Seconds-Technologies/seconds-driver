import React, { useCallback, useMemo } from "react";
import { Button, FlatList, Text, View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { acceptJob, updateJobStatus } from "../store/features/jobs/actions";
import { capitalize, getColor } from "../helpers";
import { STATUS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import classNames from "classnames";

const AllTasks = props => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const { id: driverId } = useSelector(state => state["drivers"].driver);
	const { completedJobs } = useSelector(state => state["jobs"]);

	const backgroundColor = useCallback(getColor, []);

	const statusContainer = useMemo(
		() =>
			classNames({
				flex: true,
				grow: true,
				"flex-row": true,
				"justify-end": true,
				"rounded-xl": true,
				"bg-completed-50": true,
				"py-1": true,
				"px-3": true
			}),
		[]
	);

	return (
		<View style={tailwind("flex grow justify-center my-6")}>
			<FlatList
				keyExtractor={item => item._id.toString()}
				data={completedJobs}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							key={index}
							activeOpacity={0.9}
							style={tailwind("pb-4 border border-gray-300")}
							onPress={() =>
								navigation.navigate({
									name: "Task",
									key: item._id
								})
							}
						>
							<View
								style={{
									height: 6,
									backgroundColor: backgroundColor(item.status)
								}}
							/>
							<View style={tailwind("p-3")}>
								<Text style={tailwind("font-bold text-gray-400 mb-1")}>{item["jobSpecification"].orderNumber}</Text>
								<Text style={tailwind("text-xl text-black mb-1")}>
									{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["fullAddress"]}
								</Text>
								<Text style={tailwind("font-bold text-2xl text-gray-700")}>
									{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["firstName"]}{" "}
									{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["lastName"]}
								</Text>
							</View>
							<View style={tailwind("pr-3 flex items-end")}>
								<View style={tailwind(statusContainer)}>
									<Text style={tailwind("text-base text-completed-600")}>{capitalize(item.status)}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

AllTasks.propTypes = {};

export default AllTasks;
