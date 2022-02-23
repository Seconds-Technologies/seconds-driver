import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const tailwindStyles = (props) => {
	const tailwind = useTailwind()
	return (
		<View style={styles.container}>
			<View style={tailwind('bg-new-100')}>
				<Text style={tailwind('text-lg text-new-600')}>Welcome to the tailwindStyles screen!</Text>
			</View>
			<View style={tailwind('bg-pending-100')}>
				<Text style={tailwind('text-lg text-pending-600')}>Welcome to the tailwindStyles screen!</Text>
			</View>
			<View style={tailwind('bg-dispatching-100')}>
				<Text style={tailwind('text-lg text-dispatching-600')}>Welcome to the tailwindStyles screen!</Text>
			</View>
			<View style={tailwind('bg-en-route-100')}>
				<Text style={tailwind('text-lg text-en-route-600')}>Welcome to the tailwindStyles screen!</Text>
			</View>
			<View style={tailwind('bg-completed-100')}>
				<Text style={tailwind('text-lg text-completed-600')}>Welcome to the tailwindStyles screen!</Text>
			</View>
			<View style={tailwind('bg-cancelled-100')}>
				<Text style={tailwind('text-lg text-cancelled-600')}>Welcome to the tailwindStyles screen!</Text>
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

export default tailwindStyles;
