import React, { useEffect, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import Item from "../components/Item";
import { updateJobStatus } from "../store/features/jobs/actions";
import { STATUS } from "../constants";
import { capitalize } from "../helpers";
import classNames from "classnames";

const Task = ({ route }) => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const { allJobs } = useSelector(state => state["jobs"]);

	const currentTask = useMemo(() => {
		const jobId = route.key;
		let {
			_id,
			jobSpecification: { deliveries },
			status
		} = allJobs.find(job => job._id === jobId);
		const {
			dropoffLocation: { firstName, lastName, fullAddress, email, phoneNumber, instructions }
		} = deliveries[0];
		return { id: _id, firstName, lastName, fullAddress, email, phoneNumber, instructions, status };
	}, [route, allJobs]);

	const statusContainer = useMemo(
		() =>
			classNames({
				"p-2": true,
				"px-5": true,
				"bg-new": currentTask.status === STATUS.NEW.name,
				"bg-pending": currentTask.status === STATUS.PENDING.name,
				"bg-dispatching": currentTask.status === STATUS.DISPATCHING.name,
				"bg-en-route": currentTask.status === STATUS.EN_ROUTE.name,
				"bg-completed": currentTask.status === STATUS.COMPLETED.name,
				"bg-opacity-80": true,
				"rounded": true
			}),
		[currentTask.status]
	);

	return (
		<View style={tailwind("md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl min-h-full")}>
			<View style={tailwind("flex grow justify-around items-center p-2")}>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<Item label={"Customer name"} value={`${currentTask.firstName} ${currentTask.lastName}`} />
					<Item label={"Address"} value={currentTask.fullAddress} />
					<Item label={"Email"} value={currentTask.email} />
					<Item label={"Phone number"} value={currentTask.phoneNumber} />
				</View>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<Item label={"Notes"} value={currentTask.instructions} />
				</View>
				<View style={tailwind("flex flex-row justify-between bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind(statusContainer)}>
						<Text style={tailwind("text-white text-center text-lg")}>{capitalize(currentTask.status)}</Text>
					</View>
					<View style={tailwind("ml-1 flex justify-center")}>
						<Picker
							mode='dialog'
							style={tailwind("w-32 h-8")}
							selectedValue={currentTask.status}
							onValueChange={(value, index) =>
								dispatch(
									updateJobStatus({
										jobId: currentTask.id,
										status: value
									})
								)
							}
						>
							<Picker.Item label={capitalize(STATUS.NEW.name)} value={STATUS.NEW.name} />
							<Picker.Item label={capitalize(STATUS.PENDING.name)} value={STATUS.PENDING.name} />
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

export default Task;
