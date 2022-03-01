import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { useTailwind } from "tailwind-rn";

const LoadingSpinner = ({
    show = false,
	onHide,
    color = "black",
    backgroundColor = "white",
    dimLights = 0.6,
    loadingMessage = "Loading ..."
}) => {
	const tailwind = useTailwind()
	return (
		<Modal isVisible={show} onBackdropPress={onHide} onBackButtonPress={onHide}>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<View
					style={{
						padding: 30,
						backgroundColor: `white`,
						borderRadius: 13
					}}
				>
					<ActivityIndicator animating={show} color={"black"} size='large' />
					<Text style={tailwind('text-black mt-2')}>Loading...</Text>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	}
});

LoadingSpinner.propTypes = {};

export default LoadingSpinner;
