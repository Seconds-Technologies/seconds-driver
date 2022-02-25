import React, { useCallback } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { capitalize, getColor } from "../helpers";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { JOB_STATUS } from "../constants";
import { acceptJob, updateJobStatus } from "../store/features/jobs/actions";
import { useDispatch, useSelector } from "react-redux";

const OrderCard = ({ item, bgStyle, textStyle }) => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { id: driverId } = useSelector(state => state["drivers"].driver);
	const backgroundColor = useCallback(getColor, []);

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={tailwind("pb-4 border border-gray-300")}
			onPress={() => navigation.navigate({ name: "Task", key: item._id })}
		>
			<View
				style={{
					height: 6,
					backgroundColor: backgroundColor(item.status)
				}}
			/>
			<View style={tailwind("px-3 py-2")}>
				<Text style={tailwind("font-bold text-gray-400 mb-1")}>{item["jobSpecification"].orderNumber}</Text>
				<Text style={tailwind("text-xl text-black mb-1")}>
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["streetAddress"]}{" "}
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["postcode"]}
				</Text>
				<Text style={tailwind("font-bold text-2xl text-gray-700")}>
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["firstName"]}{" "}
					{item["jobSpecification"]["deliveries"][0]["dropoffLocation"]["lastName"]}
				</Text>
			</View>
			<View style={tailwind("pr-3 flex items-end")}>
				{[JOB_STATUS.NEW.name, JOB_STATUS.PENDING.name].includes(item.status) ? (
					<View style={tailwind("flex grow flex-row justify-around w-1/2")}>
						<Button
							color='#21c11c'
							title='Accept'
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
										status: JOB_STATUS.CANCELLED
									})
								)
							}
						/>
					</View>
				) : (
					<View style={tailwind(`flex grow flex-row justify-end rounded-xl px-3 ${bgStyle}`)}>
						<Text style={tailwind(`text-base ${textStyle}`)}>{capitalize(item.status)}</Text>
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
