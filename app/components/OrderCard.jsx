import React, { useCallback, useMemo } from "react";
import { Button, Linking, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { capitalize, getColor } from "../helpers";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { JOB_STATUS } from "../constants";
import { acceptJob, updateJobStatus } from "../store/features/jobs/actions";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-native-elements";
import { URL } from "react-native-url-polyfill";
import Navigate from "./svg/Navigate";
import Icon from "../icons/Icon";
import moment from "moment";
import { callNumber } from "../utils/contacts";

const OrderCard = ({ item, bgStyle, textStyle }) => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { id: driverId } = useSelector(state => state["drivers"].driver);
	const backgroundColor = useCallback(getColor, []);

	const navigationURL = useMemo(() => {
		let directionsURL = new URL("https://www.google.com/maps/dir/");
		directionsURL.searchParams.set("api", "1");
		directionsURL.searchParams.set("destination", `${item["jobSpecification"]["deliveries"][0]["dropoffLocation"].fullAddress}`);
		directionsURL.searchParams.set("travelmode", "driving");
		return directionsURL.toString();
	}, [item]);

	const contactCustomer = useCallback(callNumber, [item]);

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[tailwind("pb-4 rounded-xl mb-3"), { backgroundColor: 'white', elevation: 1 }]}
			onPress={() => navigation.navigate({ name: "Task", key: item["jobSpecification"]["orderNumber"] })}
		>
			<View
				style={{
					borderTopRightRadius: 15,
					borderTopLeftRadius: 15,
					height: 6,
					backgroundColor: backgroundColor(item.status)
				}}
			/>
			<View style={tailwind("px-3 py-2")}>
				<View style={tailwind("flex flex-row justify-between")}>
					<Text style={tailwind("font-bold text-gray-400 mb-1")}>{item["jobSpecification"].orderNumber}</Text>
					<View style={tailwind("pr-3 flex flex-row justify-end items-start")}>
						<View style={tailwind(`flex grow flex-row justify-end rounded-md px-2 ${bgStyle}`)}>
							<Text style={tailwind(`text-sm ${textStyle}`)}>{capitalize(item.status)}</Text>
						</View>
						{item["routeOptimization"] &&
							<Badge containerStyle={{ marginLeft: 10 }} value={item["routeOptimization"].priority}
							       status="primary" />}
					</View>
				</View>
				<Text style={tailwind("text-black mb-1")}>
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["streetAddress"]}&nbsp;
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["postcode"]}
				</Text>
				<Text style={tailwind("font-bold text-base text-gray-700 mb-1")}>
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["firstName"]}&nbsp;
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["lastName"]}
				</Text>
				<View style={tailwind("pr-3 flex flex-row justify-between")}>
					<View>
						<Text>{moment(item["jobSpecification"].pickupStartTime).format("HH:mm")}&nbsp;&#8594;&nbsp;{moment(item["jobSpecification"]["deliveries"][0].dropoffEndTime).format("HH:mm")}</Text>
					</View>
					<View style={tailwind("pr-3 flex flex-row items-center")}>
						<TouchableOpacity activeOpacity={0.3}
						                  onPress={() => contactCustomer(item["jobSpecification"]["deliveries"][0]["dropoffLocation"].phoneNumber)}
						                  style={tailwind("flex flex-row items-center mr-5")}>
							<Icon name="phone" color={"black"} size={15} />
							<Text style={tailwind("ml-2 text-sm font-medium")}>Call</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.3} onPress={() => Linking.openURL(navigationURL)}
						                  style={tailwind("flex flex-row items-center")}>
							<Icon name="navigate" color={"black"} size={15} />
							<Text style={tailwind("ml-2 text-sm font-medium")}>Navigate</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={tailwind("pr-3 flex items-end")}>
				{[JOB_STATUS.NEW.name, JOB_STATUS.PENDING.name].includes(item.status) && (
					<View style={tailwind("flex grow flex-row justify-around w-1/2")}>
						<Button
							color="#21c11c"
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
							color="#C8C8C8"
							title={"Cancel"}
							onPress={() =>
								dispatch(
									updateJobStatus({
										jobId: item._id,
										status: JOB_STATUS.CANCELLED.name
									})
								)
							}
						/>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

OrderCard.propTypes = {
	item: PropTypes.object.isRequired,
	bgStyle: PropTypes.string.isRequired,
	textStyle: PropTypes.string.isRequired
};

export default OrderCard;
