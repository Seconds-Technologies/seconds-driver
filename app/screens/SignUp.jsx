import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Formik} from "formik";
import classNames from 'classnames'
import * as Device from "expo-device";
import {signupSchema} from "../validation";
import {useDispatch} from "react-redux";
import {persistor} from "../store";
import {Ionicons} from '@expo/vector-icons'
import {registerDriver} from "../store/features/drivers/auth";

const SignUp = (props) => {
	const [container, setContainer] = useState("md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl")
	const tailwind = useTailwind()
	const dispatch = useDispatch()
	const [error, setError] = useState("")

	useEffect(() => {
		(async () => {
			let deviceType = await Device.getDeviceTypeAsync();
			let isDesktop = deviceType === Device.DeviceType.DESKTOP
			setContainer(classNames({
				'bg-white': true,
				'md:mx-32': true,
				'md:my-auto': true,
				'md:h-screen': isDesktop,
				'min-h-full': true,
				'p-5': true,
				'border-0': true,
				'md:border-4': true,
				'border-gray-300': true,
				'rounded-xl': true,
			}))
		})()
	}, [container])

	const errorAlert = (
		<View style={tailwind("bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-5")}>
			<Text style={tailwind("font-bold")}>{error}</Text>
			<TouchableOpacity
				style={tailwind('absolute flex justify-center top-0 bottom-0 right-0 px-4')}
				onPress={() => setError("")}>
				<Ionicons name="close" size={25} color="red"/>
			</TouchableOpacity>
		</View>
	)

	return (
		<View style={tailwind(container)}>
			<View style={tailwind('flex grow justify-center md:items-center my-6')}>
				<Text style={tailwind('text-3xl md:text-2xl text-center font-bold md:font-medium mb-6')}>Complete Sign
					Up</Text>
				{!!error && errorAlert}
				<Formik
					enableReinitialize
					validationSchema={signupSchema}
					initialValues={{
						phone: '',
						password: '',
						confirmPassword: '',
						signupCode: ''
					}}
					onSubmit={async (values, actions) => {
						try {
							const newDriver = await dispatch(registerDriver(values)).unwrap()
							console.log("SIGN UP SUCCESS", newDriver)
						} catch (err) {
							console.log("SIGN UP FAILED")
							console.log(err.message)
							setError(err.message)
						}
					}}
				>
					{({errors, handleSubmit, handleChange, handleBlur, values}) => (
						<View style={tailwind('md:w-1/2')}>
							<View style={tailwind('mb-3')}>
								{errors['phone'] && <Text style={tailwind('text-danger')}>*</Text>}
								<TextInput
									placeholder={"Phone"}
									style={tailwind('rounded-md px-3 py-2 border border-gray-400')}
									autoComplete="tel-device"
									keyboardType='phone-pad'
									onChangeText={handleChange('phone')}
									onBlur={handleBlur('phone')}
									value={values.phone}
								/>
							</View>
							<View style={tailwind('mb-3')}>
								{errors['password'] && <Text style={tailwind('text-danger')}>*</Text>}
								<TextInput
									placeholder={"Password"}
									style={tailwind('rounded-md px-3 py-2 border border-gray-400')}
									autoComplete={"password-new"}
									secureTextEntry
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
								/>
							</View>
							<View style={tailwind('mb-3')}>
								{errors['confirmPassword'] && <Text style={tailwind('text-danger')}>*</Text>}
								<TextInput
									placeholder={"Confirm Password"}
									style={tailwind('rounded-md px-3 py-2 border border-gray-400')}
									autoComplete={"password-new"}
									secureTextEntry
									onChangeText={handleChange('confirmPassword')}
									onBlur={handleBlur('confirmPassword')}
									value={values.confirmPassword}
								/>
							</View>
							<View style={tailwind('mb-3')}>
								{errors['signupCode'] && <Text style={tailwind('text-danger')}>*</Text>}
								<TextInput
									placeholder={"Registration Code"}
									style={tailwind('rounded-md px-3 py-2 border border-gray-400')}
									autoComplete={"sms-otp"}
									keyboardType='number-pad'
									onChangeText={handleChange('signupCode')}
									onBlur={handleBlur('signupCode')}
									value={values.signupCode}
								/>
							</View>
							<View style={tailwind('mt-3')}>
								<Button
									style={tailwind('font-bold px-4 rounded h-full')}
									color={'#9400D3'}
									onPress={handleSubmit}
									title="Submit"
								/>
							</View>
						</View>
					)}
				</Formik>
			</View>
			{/*<View>
				<Button
					onPress={() => {
						persistor.purge().then(res => console.log(res));
					}}
					title={"RESET"}/>
			</View>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		backgroundColor: '#fff'
	},
	test1: {
		borderColor: "red",
		borderStyle: "solid",
		borderWidth: 3
	},
	test2: {
		borderColor: "blue",
		borderStyle: "solid",
		borderWidth: 2
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 18,
		borderRadius: 6,
	},
});

export default SignUp;
