import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Task from "../screens/Task";
import SignatureCanvas from "../containers/SignatureCanvas";

const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
	<MainStack.Navigator screenOptions={{ headerShown: false }}>
		<MainStack.Screen name={"Home"} component={Home} />
		<MainStack.Screen name={"Task"} component={Task} />
		<MainStack.Screen name={"Signature"} component={SignatureCanvas} />
	</MainStack.Navigator>
);

export default MainStackScreen;
