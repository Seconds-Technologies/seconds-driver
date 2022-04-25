import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const ExtraDetails = ({ show, onHide, message, color }) => {
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
						color,
						padding: 30,
						backgroundColor: 'white',
						borderRadius: 13
					}}
				>
					<Text style={tailwind('text-black text-lg')}>{message}</Text>
				</View>
			</View>
		</Modal>
	);
};

ExtraDetails.propTypes = {
	show: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired
};

export default ExtraDetails;
