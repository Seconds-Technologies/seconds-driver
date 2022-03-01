import React, { useRef, useState } from "react";
import SignatureScreen from "react-native-signature-canvas";
import { useDispatch } from "react-redux";
import { updateJobStatus, uploadImage } from "../store/features/jobs/actions";
import { JOB_STATUS } from "../constants";
import { ActivityIndicator, Alert, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import LoadingSpinner from "../modals/LoadingSpinner";
import { useTailwind } from "tailwind-rn";
import Modal from "react-native-modal";
import loading from "../components/Loading";

const SignatureCanvas = props => {
	const { width, height } = useWindowDimensions();
	const ref = useRef();
	const [isLoading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const tailwind = useTailwind();

	// Called after ref.current.readSignature() reads a non-empty base64 string
	const handleOK = signature => {
		setLoading(true);
		dispatch(uploadImage({ jobId: props.route.params.jobId, img: signature, type: "signature" }))
			.unwrap()
			.then(res =>
				dispatch(
					updateJobStatus({
						jobId: props.route.params.jobId,
						status: JOB_STATUS.COMPLETED.name
					})
				)
					.unwrap()
					.then(() => {
						setLoading(false);
						props.navigation.popToTop();
					})
					.catch(() => setLoading(false))
			)
			.catch(() => {
				setLoading(false);
				Alert.alert("Unable to upload signature!");
			});
	};

	// Called after ref.current.readSignature() reads an empty string
	const handleEmpty = () => {
		console.log("Empty");
	};

	// Called after ref.current.clearSignature()
	const handleClear = () => {
		console.log("clear success!");
	};

	// Called after end of stroke
	const handleEnd = () => {
		ref.current.readSignature();
	};

	// Called after ref.current.getData()
	const handleData = data => {};

	const loadingModal = (
		<Modal isVisible={isLoading} onBackdropPress={() => setLoading(false)} onBackButtonPress={() => setLoading(false)}>
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
					<ActivityIndicator animating={isLoading} color={"black"} size='large' />
					<Text style={tailwind('text-black my-2')}>Loading...</Text>
				</View>
			</View>
		</Modal>
	);

	return (
		<View style={tailwind("bg-white md:mx-32 pb-4 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			<LoadingSpinner show={isLoading} onHide={() => setLoading(false)}/>
			<SignatureScreen
				ref={ref}
				onOK={handleOK}
				onEmpty={handleEmpty}
				onClear={handleClear}
				onGetData={handleData}
				autoClear={true}
				imageType="image/jpeg"
				webStyle={`
                .m-signature-pad {
                  flex: 1;
                  height: ${height};
                  border: 1
                  box-shadow: none;
                }
                `}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	loading: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 0.5,
		alignItems: "center",
		justifyContent: "center"
	}
});

SignatureCanvas.propTypes = {};

export default SignatureCanvas;
