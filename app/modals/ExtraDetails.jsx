import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";

const ExtraDetails = ({ show, onHide, title, message, color }) => {
	const tailwind = useTailwind();
	const scrollViewRef = useRef();
	const [scrollOffset, setScrollOffset] = useState(null);

	const handleOnScroll = event => {
		setScrollOffset(event.nativeEvent.contentOffset.y);
	};

	const handleScrollTo = p => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo(p);
		}
	};

	return (
		<Modal
			isVisible={show}
			onBackdropPress={onHide}
			onBackButtonPress={onHide}
			scrollTo={handleScrollTo}
			scrollOffset={scrollOffset}
			scrollOffsetMax={400} // content height - ScrollView height
			propagateSwipe={true}
		>
			<ScrollView ref={scrollViewRef} onScroll={handleOnScroll} scrollEventThrottle={16}>
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
							backgroundColor: "white",
							borderRadius: 13
						}}
					>
						<Text style={tailwind("text-xl font-bold text-center mb-6")}>{title}</Text>
						<Text style={tailwind("text-black text-lg")}>{message}</Text>
					</View>
				</View>
			</ScrollView>
		</Modal>
	);
};

ExtraDetails.propTypes = {
	show: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired
};

export default ExtraDetails;
