import React, { useCallback } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { capitalize, getColor } from "../helpers";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { JOB_STATUS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import Infinity from "./svg/Infinity";
import moment from "moment";

const RouteCard = ({ item, bgStyle, textStyle }) => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { id: driverId } = useSelector(state => state["drivers"].driver);
	const backgroundColor = useCallback(getColor, []);

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[tailwind("pb-4 rounded-xl mb-3"), { backgroundColor: 'white', elevation: 1 }]}
			onPress={() => navigation.navigate({ name: "Route", key: item.routeId })}
		>
			<View
				style={{
					borderTopRightRadius: 15,
					borderTopLeftRadius: 15,
					height: 6,
					backgroundColor: backgroundColor(item.status)
				}}
			/>
			<View style={tailwind("px-3 pt-2")}>
				<View style={tailwind("flex flex-row justify-between")}>
					<Text style={tailwind("font-bold text-gray-400 mb-1 capitalize")}>
						{item.routeId}
					</Text>
					<View style={tailwind("flex flex-row items-center")}>
						<Infinity width={26} height={26} />
					</View>
				</View>
				<Text style={tailwind("font-bold text-2xl text-gray-700 mb-1")}>
					{`${item.count} ${item.count === 1 ? 'delivery' : 'deliveries'}`}
				</Text>
				{item.startTime && item.endTime && <Text style={tailwind("text-lg font-semibold mb-1 capitalize")}>
					{`${moment(item.startTime).format("HH:mm")} - ${moment(item.endTime).format("HH:mm")}`}
				</Text>}
			</View>
			<View style={tailwind("pr-3 flex items-end")}>
				{[JOB_STATUS.NEW.name, JOB_STATUS.PENDING.name].includes(item.status) ? (
					<View style={tailwind("flex grow flex-row justify-end w-1/2")}>
						<Button
							color='#21c11c'
							title='View Route'
							onPress={() => navigation.navigate({ name: "Route", key: item.routeId })}
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

RouteCard.propTypes = {
	item: PropTypes.object.isRequired,
	bgStyle: PropTypes.string.isRequired,
	textStyle: PropTypes.string.isRequired
};

export default RouteCard;
