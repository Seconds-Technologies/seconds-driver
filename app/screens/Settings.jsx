import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Settings = (props) => {
	return (
		<View style={styles.container}>
			<Text>Welcome to the Settings screen!</Text>
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

export default Settings;
