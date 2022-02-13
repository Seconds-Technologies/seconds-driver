import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loading from "../components/Loading";
import {useEffect, useState} from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import {useSelector} from "react-redux";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const RootStackScreen = ({userToken}) => (
	<RootStack.Navigator screenOptions={{headerShown: false}}>
		{userToken ? (
			<RootStack.Screen name={"App"} component={MainStackScreen}/>
		) : (
			<RootStack.Screen name={"Auth"} component={AuthStackScreen}/>
		)}
	</RootStack.Navigator>
);

const AuthStackScreen = () => (
	<AuthStack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
		<AuthStack.Screen name={"SignUp"} component={SignUp}/>
		<AuthStack.Screen name={"Login"} component={Login}/>
	</AuthStack.Navigator>
);

const MainStackScreen = () => (
	<MainStack.Navigator screenOptions={{headerShown: false}}>
		<MainStack.Screen name={"Home"} component={Home}/>
	</MainStack.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(false);
	const {isAuthenticated} = useSelector(state => state['drivers'])

	return (
		isLoading ?
			<Loading loading={isLoading}/> :
			<RootStackScreen userToken={isAuthenticated}/>
	);
};

export default AppNavigator;
