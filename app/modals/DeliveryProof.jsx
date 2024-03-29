import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useTailwind } from "tailwind-rn";
import Comment from "../components/svg/Comment";
import Signature from "../components/svg/Signature";
import Camera from "../components/svg/Camera";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const DeliveryProof = ({ show, onHide, jobId, orderNumber }) => {
	const tailwind = useTailwind();
	const navigation = useNavigation();

	return (
		<Modal isVisible={show} onBackdropPress={onHide} onBackButtonPress={onHide} style={styles.container} backdropOpacity={0.8}>
			<View style={tailwind("flex flex-row justify-around items-center")}>
				<View style={tailwind("flex items-center")}>
					<TouchableOpacity
						style={tailwind("mb-2 p-5 bg-white rounded-full flex items-center justify-center")}
						onPress={() => {
							onHide()
							navigation.navigate("Photo", {jobId, orderNumber})
						}}
					>
						<Camera width={40} height={40} />
					</TouchableOpacity>
					<Text style={tailwind("text-white")}>Take Photo</Text>
				</View>
				<View style={tailwind("flex items-center py-4")}>
					<TouchableOpacity
						style={tailwind("mb-2 p-5 bg-white rounded-full flex items-center justify-center")}
						onPress={() => {
							onHide()
							navigation.navigate("Signature", { jobId })
						}}
					>
						<Signature width={40} height={40} />
					</TouchableOpacity>
					<Text style={tailwind("text-white")}>Signature</Text>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
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
	}
});

DeliveryProof.propTypes = {
	show: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	jobId: PropTypes.string.isRequired,
	orderNumber: PropTypes.string.isRequired
};

export default DeliveryProof;
