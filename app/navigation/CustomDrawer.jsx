import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { LOGOUT } from "../store/actionTypes";
import { useDispatch } from "react-redux";
import DrawerIcon from "../icons/Icon";

const CustomDrawer = (props) => {
	const dispatch = useDispatch()
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem
				icon={(props) => <DrawerIcon name="logout" {...props}/>}
				label="Logout"
				onPress={() => dispatch(({
					type: LOGOUT
				}))}
			/>
		</DrawerContentScrollView>
	);
}

CustomDrawer.propTypes = {};

export default CustomDrawer;
