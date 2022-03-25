import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Task from "../screens/Task";
import AllTasks from "../containers/AllTasks";

const HistoryStack = createNativeStackNavigator();

const HistoryStackScreen = () => (
	<HistoryStack.Navigator screenOptions={{ headerShown: false }}>
		<HistoryStack.Screen name={"Orders"} component={AllTasks} />
		<HistoryStack.Screen name={"Task"} component={Task} />
	</HistoryStack.Navigator>
);

export default HistoryStackScreen;
