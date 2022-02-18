import React, { useCallback } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { acceptJob, updateJobStatus } from "../store/features/jobs";
import { getColor } from "../helpers";
import { STATUS } from "../constants";

const AllTasks = props => {
	const tailwind = useTailwind();
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
							<View key={index} style={tailwind("pb-4 border border-gray-300")}>
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
									<View style={tailwind("flex grow flex-row justify-around w-1/2")}>
										<Button color='#21c11c' title={"Accept"} onPress={() => dispatch(acceptJob({ driverId, jobId: item._id }))} />
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
								</View>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

AllTasks.propTypes = {};

export default AllTasks;
