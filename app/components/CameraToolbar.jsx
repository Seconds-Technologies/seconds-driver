import React from "react";
import { Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

const { width: WIDTH } = Dimensions.get("window");

const CameraToolbar = ({
	capturing = false,
	cameraType = Camera.Constants.Type.back,
	flashMode = Camera.Constants.FlashMode.off,
	toggleFlashMode,
	toggleCameraType,
	onCapture
}) => (
	<View accessibilityLabel={"Camera Toolbar"} accessibilityRole={"toolbar"} style={styles.bottomToolbar}>
		<View style={{ display: "flex", flexDirection: "row"}}>
			<View style={styles.alignCenter}>
				<TouchableOpacity accessibilityLabel={"Toggle Camera Flash"} accessibilityRole={"imagebutton"} onPress={toggleFlashMode}>
					<Ionicons name={flashMode === Camera.Constants.FlashMode.on ? "flash" : "flash-off"} color='white' size={30} />
				</TouchableOpacity>
			</View>
			<View size={2} style={styles.alignCenter}>
				<TouchableWithoutFeedback accessibilityLabel={"Take Picture"} accessibilityRole={"imagebutton"} onPress={onCapture}>
					<View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
						{capturing && <View style={styles.captureBtnInternal} />}
					</View>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.alignCenter}>
				<TouchableOpacity
					accessibilityLabel={"switch camera"}
					accessibilityHint={"switches between rear and front camera"}
					accessibilityRole={"imagebutton"}
					onPress={toggleCameraType}
				>
					<Ionicons name='camera-reverse-outline' color='white' size={30} />
				</TouchableOpacity>
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	alignCenter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	topToolbar: {
		height: 45,
		borderColor: "red",
		borderStyle: "solid",
		borderWidth: 2,
		color: "transparent"
		//left: WIDTH*0.5,
		//alignSelf: 'flex-end'
	},
	bottomToolbar: {
		width: WIDTH,
		position: "absolute",
		height: 100,
		bottom: 0
	},
	captureBtn: {
		width: 60,
		height: 60,
		borderWidth: 2,
		borderRadius: 60,
		borderColor: "#FFFFFF"
	},
	captureBtnActive: {
		width: 80,
		height: 80
	},
	captureBtnInternal: {
		width: 76,
		height: 76,
		borderWidth: 2,
		borderRadius: 76,
		borderStyle: "solid",
		borderColor: "red"
	}
});

CameraToolbar.propTypes = {};

export default CameraToolbar;
