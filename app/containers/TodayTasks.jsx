import React, { useCallback } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getColor } from "../helpers";

const TodayTasks = props => {
	const tailwind = useTailwind();
	const navigation = useNavigation();
	const backgroundColor = useCallback(getColor, []);
	const { id: driverId } = useSelector(state => state["drivers"].driver);
	const { currentJobs } = useSelector(state => state["jobs"]);

	return (
		<View style={tailwind("flex grow justify-center my-6")}>
			<FlatList
				keyExtractor={item => item._id.toString()}
				data={currentJobs}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							activeOpacity={0.9}
							style={tailwind("pb-4 border border-gray-300")}
							onPress={() => navigation.navigate({ name: "Task", key: item._id })}
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
								<View style={tailwind("flex grow flex-row justify-end")}>
									<Button color='#8B572A' title={"View"} onPress={() => navigation.navigate({ name: "Task", key: item._id })} />
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

TodayTasks.propTypes = {};

export default TodayTasks;
