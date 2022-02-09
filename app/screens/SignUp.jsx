import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Formik} from "formik";
import classNames from 'classnames'
import * as Device from "expo-device";
import {signupSchema} from "../validation";

const SignUp = (props) => {
	const [container, setContainer] = useState("md:mx-32 p-5 border-0 md:border-4 border-gray-300 rounded-xl")
	const tailwind = useTailwind()

	useEffect(() => {
		(async () => {
			let deviceType = await Device.getDeviceTypeAsync();
			let isDesktop = deviceType === Device.DeviceType.DESKTOP
			setContainer(classNames({
				'md:mx-32': true,
				'md:my-auto': true,
				'md:h-screen': isDesktop,
				'p-5': true,
				'border-0': true,
				'md:border-4': true,
				'border-gray-300': true,
				'rounded-xl': true
			}))
		})()
	}, [container])

	return (
		<View style={tailwind(container)}>
			<View style={tailwind('flex items-center')}>
				<Text style={tailwind('text-2xl font-medium')}>Complete Sign Up</Text>
			</View>
			<View style={tailwind('flex md:items-center my-6')}>
				<Formik
					enableReinitialize
					validationSchema={signupSchema}
					initialValues={{
						phone: '',
						password: '',
						confirmPassword: '',
					}}
					onSubmit={async (values) => {
						await new Promise((r) => setTimeout(r, 500));
						alert(JSON.stringify(values, null, 2));
					}}
				>
					{({errors, handleSubmit, handleChange, handleBlur, values}) => (
						<View style={tailwind('md:w-1/2')}>
							<View style={tailwind('mb-3')}>
								{errors['phone'] && <Text style={tailwind('text-danger')}>*</Text>}
								<TextInput
									placeholder={"Phone"}
									style={tailwind('rounded-md p-3 border border-gray-400')}
									autoComplete={"tel"}
									onChangeText={handleChange('phone')}
									onBlur={handleBlur('phone')}
									value={values.phone}
								/>
							</View>
							<View style={tailwind('mb-3')}>
								{errors['phone'] && <Text style={tailwind('text-danger')}>*</Text>}
								<TextInput
									placeholder={"Password"}
									style={tailwind('rounded-md p-3 border border-gray-400')}
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
									style={tailwind('rounded-md p-3 border border-gray-400')}
									autoComplete={"password-new"}
									secureTextEntry
									onChangeText={handleChange('confirmPassword')}
									onBlur={handleBlur('confirmPassword')}
									value={values.confirmPassword}
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
		</View>
	);
}

const styles = StyleSheet.create({
	test1: {
		borderColor: "red",
		borderStyle: "solid",
		borderWidth: 3
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
