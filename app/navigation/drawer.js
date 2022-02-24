import { StyleSheet, View } from 'react-native';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackScreen from "./MainStack";
import CustomDrawer from "./CustomDrawer";
import { THEME } from "../constants";

const Drawer = createDrawerNavigator();

const DrawerScreen = (props) => (
	<Drawer.Navigator
		drawerContent={(props) => <CustomDrawer {...props}/>}
		screenOptions={{
			headerStyle: {
				height: 80
			},
			headerBackground: () => <View style={StyleSheet.absoluteFill} />
		}}
		initialRouteName='Home'
	>
		<Drawer.Screen name='Orders' component={MainStackScreen} options={{ drawerLabel: "Home" }} />
		<Drawer.Screen name='Profile' component={Profile} options={{ drawerLabel: "Profile" }} />
	</Drawer.Navigator>
);

export default DrawerScreen;
