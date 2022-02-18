import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import Item from "../components/Item";
import { updateJobStatus } from "../store/features/jobs";
import { STATUS } from "../constants";
import { capitalize } from "../helpers";

const Task = ({ route }) => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const { currentJobs } = useSelector(state => state["jobs"]);

	const currentJob = useMemo(() => {
		const jobId = route.key;
		let {
			_id,
			jobSpecification: { deliveries },
			status
		} = currentJobs.find(job => job._id === jobId);
		const {
			dropoffLocation: { firstName, lastName, fullAddress, email, phoneNumber, instructions }
		} = deliveries[0];
		return { id: _id, firstName, lastName, fullAddress, email, phoneNumber, instructions, status };
	}, [route]);

	useEffect(() => {
		console.log(currentJob);
	}, [currentJob]);

	return (
		<View style={tailwind("md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl min-h-full")}>
			<View style={tailwind("flex grow justify-around items-center p-2")}>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<Item label={"Customer name"} value={`${currentJob.firstName} ${currentJob.lastName}`} />
					<Item label={"Address"} value={currentJob.fullAddress} />
					<Item label={"Email"} value={currentJob.email} />
					<Item label={"Phone number"} value={currentJob.phoneNumber} />
				</View>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<Item label={"Notes"} value={currentJob.instructions} />
				</View>
				<View style={tailwind("flex flex-row justify-between bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind("p-3 w-5/12 bg-dispatching bg-opacity-80 rounded")}>
						<Text style={tailwind("text-white text-center text-lg")}>{capitalize(currentJob.status)}</Text>
					</View>
					<View style={tailwind("border border-gray-300")}>
						<Picker
							style={tailwind("w-32 h-8 flex items-center justify-center")}
							selectedValue={currentJob.status}
							onValueChange={(value, index) =>
								dispatch(
									updateJobStatus({
										jobId: currentJob.id,
										status: value
									})
								)
							}
						>
							<Picker.Item label={capitalize(STATUS.DISPATCHING.name)} value={STATUS.DISPATCHING.name} />
							<Picker.Item label={capitalize(STATUS.EN_ROUTE.name)} value={STATUS.EN_ROUTE.name} />
							<Picker.Item label={capitalize(STATUS.COMPLETED.name)} value={STATUS.COMPLETED.name} />
						</Picker>
					</View>
				</View>
			</View>
			<View style={tailwind("flex items-center justify-center h-24")}>
				<TouchableOpacity style={tailwind("w-48 bg-primary px-3 py-2 rounded-lg")}>
					<Text style={tailwind("text-center text-white font-bold text-2xl")}>Navigate</Text>
				</TouchableOpacity>
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

export default Task;
