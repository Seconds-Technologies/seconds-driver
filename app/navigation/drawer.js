import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackScreen from "./MainStack";
import { BlurView } from 'expo-blur';
import { StyleSheet} from "react-native";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerScreen = (props) => (
	<Drawer.Navigator
		drawerContent={(props) => <CustomDrawer {...props}/>}
		screenOptions={{headerShown: false}}
		initialRouteName='Home'
	>
		<Drawer.Screen name='Main' component={MainStackScreen} options={{ drawerLabel: "Home" }} />
		<Drawer.Screen name='Profile' component={Profile} options={{ drawerLabel: "Profile" }} />
		<Drawer.Screen name='Settings' component={Settings} options={{ drawerLabel: "Settings" }} />
	</Drawer.Navigator>
);

export default DrawerScreen;
