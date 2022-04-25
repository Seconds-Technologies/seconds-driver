import React from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const Payouts = () => {
	const tailwind = useTailwind()
	return (
		<View style={tailwind("bg-white md:mx-32 pt-5 pb-2 px-5 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<Text style={tailwind('text-lg text-center')}>Coming Soon</Text>
		</View>
	);
};

export default Payouts;
