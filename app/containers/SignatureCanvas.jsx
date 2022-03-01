import React, { useRef, useState } from "react";
import SignatureScreen from "react-native-signature-canvas";

const SignatureCanvas = props => {
	const ref = useRef();
	const [text, setText] = useState("hello")

	// Called after ref.current.readSignature() reads a non-empty base64 string
	const handleOK = signature => {
		console.log(signature);
		// Callback from Component props
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
	const handleData = data => {
		console.log(data);
	};

	return (
		<SignatureScreen
			ref={ref}
			onOK={handleOK}
			onEmpty={handleEmpty}
			onClear={handleClear}
			onGetData={handleData}
			autoClear={true}
			descriptionText={text}
		/>
	);
};

SignatureCanvas.propTypes = {};

export default SignatureCanvas;
