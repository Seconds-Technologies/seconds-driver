import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from "formik";
import {loginSchema} from "../validation";
import {loginDriver} from "../store/features/drivers/actions";
import {useTailwind} from "tailwind-rn";
import {useDispatch} from "react-redux";
import * as Device from "expo-device";
import classNames from "classnames";
import {Ionicons} from "@expo/vector-icons";

const Login = ({navigation}) => {
	const [container, setContainer] = useState("bg-white md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl")
	const [error, setError] = useState("")
	const tailwind = useTailwind()
	const dispatch = useDispatch()

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

	return (
		<View style={tailwind(container)}>
			<View style={tailwind('flex grow justify-center md:items-center my-6')}>
				<Text style={tailwind('text-3xl md:text-2xl text-center font-bold md:font-medium mb-6')}>Login</Text>
				{!!error && errorAlert}
				<Formik
					enableReinitialize
					validationSchema={loginSchema}
					initialValues={{
						phone: '',
						password: '',
					}}
					onSubmit={async (values, actions) => {
						try {
							const newDriver = await dispatch(loginDriver(values)).unwrap()
							console.log("LOGIN SUCCESS!", newDriver)
						} catch (err) {
							console.log("LOGIN FAILED", err.message)
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
							<View style={tailwind('mt-3')}>
								<Button
									style={tailwind('font-bold px-4 rounded h-full')}
									color={'#9400D3'}
									onPress={handleSubmit}
									title="Login"
								/>
							</View>
							<View style={tailwind('py-4 flex items-center text-center')}>
								<Text onPress={() => navigation.navigate('SignUp')}>No account?&nbsp;<Text
									style={tailwind('font-bold underline')}>Register here</Text> </Text>
							</View>
						</View>
					)}
				</Formik>
			</View>
		</View>
	);
}

export default Login;
