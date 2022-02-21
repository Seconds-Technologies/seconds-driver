import React, { useCallback } from "react";
import { Button, FlatList, Text, View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { acceptJob, updateJobStatus } from "../store/features/jobs/actions";
import { getColor } from "../helpers";
import { STATUS } from "../constants";
import { useNavigation } from "@react-navigation/native";

const AllTasks = props => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { id: driverId } = useSelector(state => state["drivers"].driver);
	const { allJobs } = useSelector(state => state["jobs"]);

	const backgroundColor = useCallback(getColor, []);

	return (
		<View>
			<View style={tailwind("flex grow justify-center my-6")}>
				<FlatList
					keyExtractor={item => item._id.toString()}
					data={allJobs}
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
										height: 7,
										backgroundColor: backgroundColor(item.status)
									}}
								/>
								<View style={tailwind("p-3")}>
									<Text style={tailwind("font-bold text-gray-400 mb-1")}>{item["jobSpecification"].orderNumber}</Text>
									<Text style={tailwind("text-xl text-black mb-1")}>
										{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["fullAddress"]}
									</Text>
									<Text style={tailwind("font-bold text-3xl text-gray-700")}>
										{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["firstName"]}{" "}
										{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["lastName"]}
									</Text>
								</View>
								<View style={tailwind("pt-3 pr-3 flex items-end")}>
									{[STATUS.NEW.name, STATUS.PENDING.name].includes(item.status) && (
										<View style={tailwind("flex grow flex-row justify-around w-1/2")}>
											<Button
												color='#21c11c'
												title="Accept"
												onPress={() =>
													dispatch(
														acceptJob({
															driverId,
															jobId: item._id
														})
													)
												}
											/>
											<Button
												color='#C8C8C8'
												title={"Cancel"}
												onPress={() =>
													dispatch(
														updateJobStatus({
															jobId: item._id,
															status: STATUS.CANCELLED
														})
													)
												}
											/>
										</View>
									)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		</View>
	);
};

AllTasks.propTypes = {};

export default AllTasks;
