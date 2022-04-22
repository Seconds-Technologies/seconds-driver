import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import CameraToolbar from "../components/CameraToolbar";
import { useTailwind } from "tailwind-rn";
import { JOB_STATUS, THEME } from "../constants";
import { useDispatch } from "react-redux";
import { updateJobStatus } from "../store/features/jobs/actions";
import * as FileSystem from "expo-file-system";
import { SERVER_BASE_URL } from "@env";
import LoadingSpinner from "../modals/LoadingSpinner";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

const CameraCanvas = props => {
	let camera = useRef(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
	const [isLoading, setLoading] = useState(false);
	const [image, setImage] = useState({
		uri: "",
		name: "",
		width: 0,
		height: 0,
		type: "image/jpeg"
	});
	const tailwind = useTailwind();
	const dispatch = useDispatch();

	const takePicture = async () => {
		if (camera.current) {
			const options = { quality: 1, base64: false, fixOrientation: true };
			const data = await camera.current.takePictureAsync(options);
			setImage(prevState => ({ ...prevState, ...data, name: `image-${Date.now()}.jpg` }));
		}
	};

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
			StatusBar.setHidden(true, "slide");
		})();
		return () => StatusBar.setHidden(false, "slide");
	}, []);

	const Preview = (
		<View style={tailwind("mx-4 min-h-full flex flex-1 items-center")}>
			<LoadingSpinner show={isLoading} onHide={() => setLoading(false)}/>
			<Image source={{ uri: image.uri }} accessibilityLabel={"Image Preview"} style={{ flex: 0.9, aspectRatio: 0.5 }} resizeMode='contain' />
			<View style={tailwind("flex flex-row justify-around w-full")}>
				<View style={tailwind("w-32")}>
					<Button
						title={"Re-take"}
						color={THEME.SECONDARY}
						onPress={() =>
							setImage({
								uri: "",
								name: "",
								width: 0,
								height: 0,
								type: "image/jpeg"
							})
						}
						style={tailwind("w-32")}
					/>
				</View>
				<View style={tailwind("w-32")}>
					<Button
						title={"Confirm"}
						color={THEME.PRIMARY}
						onPress={async () => {
							try {
								setLoading(true);
								const info = await FileSystem.uploadAsync(`${SERVER_BASE_URL}/server/driver/upload-delivery-photo`, image.uri, {
									uploadType: FileSystem.FileSystemUploadType.MULTIPART,
									fieldName: "img",
									mimeType: "image/jpeg",
									parameters: {
										orderNumber: props.route.params.orderNumber,
										jobId: props.route.params.jobId,
										type: "photo"
									}
								});
								await dispatch(
									updateJobStatus({
										jobId: props.route.params.jobId,
										status: JOB_STATUS.COMPLETED.name
									})
								).unwrap();
								setLoading(false)
								props.navigation.popToTop();
							} catch (err) {
								console.log(err.message);
								setLoading(false);
								Alert.alert("There was a problem uploading your photo. Please take another one");
							}
						}}
						style={tailwind("w-32")}
					/>
				</View>
			</View>
		</View>
	);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return image.uri ? (
		Preview
	) : (
		<React.Fragment>
			<View>
				<Camera ref={camera} style={styles.camera} type={cameraType} flashMode={flashMode} ratio={"16:9"} />
			</View>
			<CameraToolbar
				toggleCameraType={() =>
					setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
				}
				cameraType={cameraType}
				flashMode={flashMode}
				toggleFlashMode={() =>
					setFlashMode(flashMode === Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on)
				}
				onCapture={takePicture}
			/>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	camera: {
		position: "absolute",
		height: HEIGHT,
		width: WIDTH,
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: "transparent",
		flexDirection: "row",
		margin: 20
	},
	button: {
		flex: 0.1,
		alignSelf: "flex-end",
		alignItems: "center"
	},
	text: {
		fontSize: 18,
		color: "white"
	}
});

CameraCanvas.propTypes = {};

export default CameraCanvas;
