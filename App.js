import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import SignUp from "./app/screens/SignUp";
import {useTailwind} from "tailwind-rn";
import * as Device from 'expo-device';

export default function App() {
	const tailwind = useTailwind()

	return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<View style={styles.container}>
					<SignUp/>
				</View>
			</NavigationContainer>
		</TailwindProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		backgroundColor: '#fff',
	},
});
