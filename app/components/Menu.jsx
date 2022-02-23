import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Menu = ()  => {
	const navigation = useNavigation()
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={styles.container}
			onPress={() => navigation.toggleDrawer()}
		>
			<Ionicons name='menu-outline' size={40} color='black' />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 35,
		right: 10
	}
});

Menu.propTypes = {};

export default Menu;
