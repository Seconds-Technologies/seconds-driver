import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, Linking, Text, TouchableOpacity, View, Alert, Platform } from "react-native";
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
import Icon from "../icons/Icon";
import { callNumber } from "../utils/contacts";
import ExtraDetails from "../modals/ExtraDetails";

const Task = ({ navigation, route }) => {
	const [showSignature, setShowSignature] = useState(false);
	const [extra, setExtra] = useState({ show: false, title: "", message: "" });
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const { allJobs } = useSelector(state => state["jobs"]);

	const currentTask = useMemo(() => {
		const orderNumber = route.key;
		let {
			_id,
			driverInformation: { pickedUpAt, deliveredAt },
			jobSpecification: { pickupStartTime, pickupEndTime, deliveries },
			status
		} = allJobs.find(job => job["jobSpecification"]["orderNumber"] === orderNumber);
		const {
			description,
			dropoffLocation: { firstName, lastName, streetAddress, city, postcode, fullAddress, email, phoneNumber, instructions },
			dropoffStartTime,
			dropoffEndTime,
			proofOfDelivery
		} = deliveries[0];
		const customerName = String(`${firstName} ${lastName}`).substring(0, 25);
		return {
			id: _id,
			orderNumber,
			customerName,
			streetAddress,
			city,
			postcode,
			fullAddress,
			email,
			phoneNumber,
			instructions,
			status,
			description,
			pickupStartTime,
			dropoffEndTime,
			pickedUpAt,
			deliveredAt,
			proofOfDelivery
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
				"bg-completed-400": currentTask.status === JOB_STATUS.COMPLETED.name,
				"bg-opacity-80": true,
				rounded: true
			}),
		[currentTask.status]
	);

	const navigationURL = useMemo(() => {
		let directionsURL = new URL("https://www.google.com/maps/dir/");
		directionsURL.searchParams.set("api", "1");
		directionsURL.searchParams.set("destination", `${currentTask.fullAddress}`);
		directionsURL.searchParams.set("travelmode", "driving");
		return directionsURL.toString();
	}, [currentTask]);

	const contactCustomer = useCallback(callNumber, [currentTask]);

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
			<ExtraDetails
				show={extra.show}
				onHide={() => setExtra(prevState => ({ ...prevState, show: false }))}
				title={extra.title}
				message={extra.message}
				color='black'
			/>
			<View style={tailwind("flex grow justify-around items-center p-2")}>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind("flex flex-row justify-between")}>
						<Item numberOfLines={1} label={"Customer name"} value={currentTask.customerName} />
						<TouchableOpacity activeOpacity={0.3} style={tailwind("self-end mb-3")} onPress={() => Linking.openURL(navigationURL)}>
							<Navigate />
						</TouchableOpacity>
					</View>
					<Item numberOfLines={2} label={"Address"} value={currentTask.fullAddress} />
					<Item numberOfLines={1} label={"Email"} value={currentTask.email} />
					<View style={tailwind("flex flex-row items-center")}>
						<Item numberOfLines={1} label={"Phone number"} value={currentTask.phoneNumber} />
						<TouchableOpacity
							activeOpacity={0.5}
							style={tailwind("ml-4 p-3 rounded-full")}
							onPress={() => contactCustomer(currentTask.phoneNumber)}
						>
							<Icon name='phone' size={25} color={"black"} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind("flex flex-row justify-between")}>
						<Item
							onClick={() => setExtra(prevState => ({ show: true, message: currentTask.description }))}
							numberOfLines={1}
							label={"Description"}
							value={currentTask.description}
						/>
						{currentTask.description.length > 30 && (
							<TouchableOpacity
								style={tailwind("flex justify-center")}
								activeOpacity={0.5}
								onPress={() =>
									setExtra(prevState => ({
										show: true,
										title: "Package Description",
										message: currentTask.description
									}))
								}
							>
								<Icon name='expand' size={20} color={"black"} />
							</TouchableOpacity>
						)}
					</View>
				</View>
				<View style={tailwind("flex bg-white w-full p-5 rounded-lg")}>
					<View style={tailwind("flex flex-row justify-between")}>
						<Item
							numberOfLines={1}
							label={"Notes"}
							value={currentTask.instructions}
							onClick={() => setExtra(prevState => ({ show: true, message: currentTask.instructions }))}
						/>
						{currentTask.instructions.length > 30 && (
							<TouchableOpacity
								style={tailwind("flex justify-center")}
								activeOpacity={0.5}
								onPress={() =>
									setExtra(prevState => ({
										show: true,
										title: "Delivery Instructions",
										message: currentTask.instructions
									}))
								}
							>
								<Icon name='expand' size={20} color={"black"} />
							</TouchableOpacity>
						)}
					</View>
				</View>
				{currentTask.status !== JOB_STATUS.COMPLETED.name ? (
					<View style={tailwind("flex flex-row justify-center bg-white w-full p-5 rounded-lg")}>
						<View style={tailwind(`${statusContainer} text-white ml-1 flex justify-center items-center`)}>
							<Picker
								mode='dialog'
								numberOfLines={1}
								style={tailwind(`text-white w-48 h-8`)}
								selectedValue={currentTask.status}
								onValueChange={onValueChange}
							>
								<Picker.Item label={capitalize(JOB_STATUS.NEW.name)} value={JOB_STATUS.NEW.name} style={tailwind("text-lg")} />
								<Picker.Item
									label={capitalize(JOB_STATUS.PENDING.name)}
									value={JOB_STATUS.PENDING.name}
									style={tailwind("text-lg")}
								/>
								<Picker.Item
									label={capitalize(JOB_STATUS.DISPATCHING.name)}
									value={JOB_STATUS.DISPATCHING.name}
									style={tailwind("text-lg")}
								/>
								<Picker.Item
									label={capitalize(JOB_STATUS.EN_ROUTE.name)}
									value={JOB_STATUS.EN_ROUTE.name}
									style={tailwind("text-lg")}
								/>
								<Picker.Item
									label={capitalize(JOB_STATUS.COMPLETED.name)}
									value={JOB_STATUS.COMPLETED.name}
									style={tailwind("text-lg")}
								/>
							</Picker>
						</View>
					</View>
				) : (
					<View style={tailwind("flex w-full items-center")}>
						<TouchableOpacity
							activeOpacity={0.6}
							style={tailwind("flex flex-row px-5 py-3 justify-center w-7/12 bg-primary/[.60] rounded-xl")}
							onPress={() => navigation.navigate("Receipt", currentTask)}
						>
							<Text style={tailwind("text-lg font-bold")}>Proof of Delivery</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};
export default Task;
