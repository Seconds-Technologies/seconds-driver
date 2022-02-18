import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { useTailwind } from "tailwind-rn";

const Item = ({ label, value, containerStyles }) => {
	const tailwind = useTailwind();
	return (
		<View style={tailwind(containerStyles)}>
			<Text style={tailwind('text-primary font-bold my-1')}>{label}</Text>
			<Text style={tailwind('mb-2 text-lg')}>{value ? value : "N/A"}</Text>
		</View>
	);
};

Item.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	containerStyles: PropTypes.string
};

export default Item;
