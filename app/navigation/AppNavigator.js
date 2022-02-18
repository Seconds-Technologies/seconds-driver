import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loading from "../components/Loading";
import {useEffect, useState} from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import {useSelector} from "react-redux";
import {setApiKey, setTokenHeader} from "../api";
import {getValueFor} from "../services/keyStore";
import Task from "../screens/Task";

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
		<MainStack.Screen name={"Task"} component={Task}/>
	</MainStack.Navigator>
);

const AppNavigator = props => {
	const [isLoading, setIsLoading] = useState(false);
	const {isAuthenticated} = useSelector(state => state['drivers'])

	useEffect(() => {
		(async () => {
			setIsLoading(true)
			const result = await getValueFor("credentials")
			if (result) {
				const {apiKey, token} = JSON.parse(result)
				console.log(apiKey, token)
				if (token && apiKey) {
					await setApiKey(apiKey)
					await setTokenHeader(token)
				}
			}
			setIsLoading(false)
		})()
	}, [])

	return (
		isLoading ?
			<Loading loading={isLoading}/> :
			<RootStackScreen userToken={isAuthenticated}/>
	);
};

export default AppNavigator;
