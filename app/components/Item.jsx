import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { useTailwind } from "tailwind-rn";

const Item = ({ label, value, containerStyles, numberOfLines, onClick }) => {
	const tailwind = useTailwind();
	return (
		<View style={tailwind("flex flex-col shrink")} onPress={onClick}>
			<Text style={tailwind('text-primary font-bold my-1')}>{label}</Text>
			<Text numberOfLines={numberOfLines} style={tailwind('mb-2 text-lg')}>{value ? value : "N/A"}</Text>
		</View>
	);
};

Item.propTypes = {
	numberOfLines: PropTypes.number,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onClick: PropTypes.func,
	containerStyles: PropTypes.string
};

export default Item;
