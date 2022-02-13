import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from '../screens/SignUp';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="Signup" component={Signup} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
};

export default AuthStack;
