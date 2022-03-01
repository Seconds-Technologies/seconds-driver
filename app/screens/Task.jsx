import React, { useEffect, useMemo, useState } from "react";
import { BackHandler, Linking, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Item from "../components/Item";
import { updateJobStatus } from "../store/features/jobs/actions";
import { JOB_STATUS } from "../constants";
import { capitalize } from "../helpers";
import Navigate from "../components/svg/Navigate";
import { URL } from "react-native-url-polyfill";
import DeliveryProof from "../modals/DeliveryProof";
import CameraCanvas from "../containers/CameraCanvas";
import { useFocusEffect } from "@react-navigation/native";

const Task = ({ navigation, route }) => {
	const [showSignature, setShowSignature] = useState(false);
	const [isCamera, setIsCamera] = useState(false);
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const { allJobs } = useSelector(state => state["jobs"]);

	const currentTask = useMemo(() => {
		const orderNumber = route.key;
		let {
			_id,
			jobSpecification: { deliveries },
			status
		} = allJobs.find(job => job["jobSpecification"]["orderNumber"] === orderNumber);
		const {
			description,
			dropoffLocation: { firstName, lastName, streetAddress, city, postcode, fullAddress, email, phoneNumber, instructions }
		} = deliveries[0];
		console.log("STATUS:", status);
		return {
			id: _id,
			orderNumber,
			firstName,
			lastName,
			streetAddress,
			city,
			postcode,
			fullAddress,
			email,
			phoneNumber,
			instructions,
			status,
			description
		};
	}, [route, allJobs]);

	const statusContainer = useMemo(
		() =>
			classNames({
				"p-2": true,
				"px-5": true,
				"bg-new": currentTask.status === JOB_STATUS.NEW.name,
				"bg-pending": currentTask.status === JOB_STATUS.PENDING.name,
				"bg-dispatching": currentTask.status === JOB_STATUS.DISPATCHING.name,
				"bg-en-route": currentTask.status === JOB_STATUS.EN_ROUTE.name,
				"bg-completed": currentTask.status === JOB_STATUS.COMPLETED.name,
				"bg-opacity-80": true,
				rounded: true
			}),
		[currentTask.status]
	);

	const navigationURL = useMemo(() => {
		/*let baseURL = new URL("https://www.google.com/maps/dir/");
			let params = new URLSearchParams(baseURL.search);
			params.set("api", "1");
			params.set("destination", `${currentTask.streetAddress}${currentTask.city}${currentTask.postcode}`);*/
		let directionsURL = new URL("https://www.google.com/maps/dir/");
		directionsURL.searchParams.set("api", "1");
		directionsURL.searchParams.set("destination", `${currentTask.fullAddress}`);
		directionsURL.searchParams.set("travelmode", "driving");
		return directionsURL.toString();
	}, [currentTask]);

	const onValueChange = async (value, index) => {
		value === JOB_STATUS.COMPLETED.name
			? setShowSignature(true)
			: await dispatch(
					updateJobStatus({
						jobId: currentTask.id,
						status: value
					})
			  ).unwrap();
	};

	return (
		<View style={tailwind("md:mx-32 pb-5 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<DeliveryProof show={showSignature} onHide={() => setShowSignature(false)} jobId={currentTask.id} orderNumber={currentTask.orderNumber} />
			<View style={tailwind("flex grow justify-around items-center p-2")}>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind("flex flex-row justify-between")}>
						<Item label={"Customer name"} value={`${currentTask.firstName} ${currentTask.lastName}`} />
						<TouchableOpacity activeOpacity={0.3} style={tailwind("self-end mb-3")} onPress={() => Linking.openURL(navigationURL)}>
							<Navigate />
						</TouchableOpacity>
					</View>
					<Item label={"Address"} value={currentTask.fullAddress} />
					<Item label={"Email"} value={currentTask.email} />
					<Item label={"Phone number"} value={currentTask.phoneNumber} />
				</View>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<Item label={"Description"} value={currentTask.description} />
				</View>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<Item label={"Notes"} value={currentTask.instructions} />
				</View>
				<View style={tailwind("flex flex-row justify-between bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind(statusContainer)}>
						<Text style={tailwind("text-white text-center text-lg")}>{capitalize(currentTask.status)}</Text>
					</View>
					<View style={tailwind("ml-1 flex justify-center")}>
						<Picker mode='dialog' style={tailwind("w-32 h-8")} selectedValue={currentTask.status} onValueChange={onValueChange}>
							<Picker.Item label={capitalize(JOB_STATUS.NEW.name)} value={JOB_STATUS.NEW.name} />
							<Picker.Item label={capitalize(JOB_STATUS.PENDING.name)} value={JOB_STATUS.PENDING.name} />
							<Picker.Item label={capitalize(JOB_STATUS.DISPATCHING.name)} value={JOB_STATUS.DISPATCHING.name} />
							<Picker.Item label={capitalize(JOB_STATUS.EN_ROUTE.name)} value={JOB_STATUS.EN_ROUTE.name} />
							<Picker.Item label={capitalize(JOB_STATUS.COMPLETED.name)} value={JOB_STATUS.COMPLETED.name} />
						</Picker>
					</View>
				</View>
			</View>
		</View>
	);
};
export default Task;
