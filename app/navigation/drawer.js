import { StyleSheet, View } from "react-native";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackScreen from "./MainStack";
import CustomDrawer from "./CustomDrawer";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerScreen = props => {
	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawer {...props} />}
			screenOptions={{
				headerStyle: {
					height: 80
				},
				headerBackground: () => <View style={StyleSheet.absoluteFill} />
			}}
			screenListeners={({ route, navigation }) => ({
				state: ({ data }) => {
					let routes = data.state.routes;
					/*console.log("------------------------------------------------");
					console.log(route);
					console.log("------------------------------------------------");*/
					routes.find(item => {
						if (route.name === "Orders" && item.name === "Orders") {
							if (route.state && route.state.routes) {
								let task = route.state.routes.find(route => route.name === "Task");
								let signature = route.state.routes.find(route => route.name === "Signature");
								console.log(task);
								console.log(signature);
								signature
									? navigation.setOptions({
											title: "Signature"
									  })
									: task
									? navigation.setOptions({
											title: `#${task.key}`
									  })
									: navigation.setOptions({
											title: route.name
									  });
							}
						}
					});
				}
			})}
			initialRouteName='Orders'
		>
			<Drawer.Screen
				name='Orders'
				component={MainStackScreen}
				options={({ route }) => ({
					drawerLabel: "Home"
				})}
			/>
			<Drawer.Screen name='Profile' component={Profile} options={{ drawerLabel: "Profile" }} />
		</Drawer.Navigator>
	);
};

export default DrawerScreen;
