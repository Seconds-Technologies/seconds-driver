import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from "../screens/SignUp";

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
	<AuthStack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
		<AuthStack.Screen name={"SignUp"} component={SignUp} />
		<AuthStack.Screen name={"Login"} component={Login} />
	</AuthStack.Navigator>
);

export default AuthStackScreen;
