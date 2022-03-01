import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Task from "../screens/Task";
import SignatureCanvas from "../containers/SignatureCanvas";
import CameraCanvas from "../containers/CameraCanvas";

const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
	<MainStack.Navigator screenOptions={{ headerShown: false }}>
		<MainStack.Screen name={"Home"} component={Home} />
		<MainStack.Screen name={"Task"} component={Task} />
		<MainStack.Screen name={"Signature"} component={SignatureCanvas} />
		<MainStack.Screen name={"Photo"} component={CameraCanvas} />
	</MainStack.Navigator>
);

export default MainStackScreen;
