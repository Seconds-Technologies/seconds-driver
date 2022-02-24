import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "react-native-user-avatar";
import { Formik } from "formik";
import { updateDriverProfile } from "../store/features/drivers/actions";
import Modal from "react-native-modal";
import { profileSchema } from "../validation";

const Profile = props => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const [successMessage, setSuccess] = useState("");
	const { id, firstname, lastname, phone, email, vehicle } = useSelector(state => state["drivers"].driver);

	const successModal = (
		<Modal isVisible={!!successMessage} onBackdropPress={() => setSuccess("")} onBackButtonPress={() => setSuccess("")}>
			<View style={tailwind("flex items-center justify-center m-10")}>
				<View style={styles.modalView}>
					<Text style={tailwind("text-center text-xl")}>{successMessage}</Text>
				</View>
			</View>
		</Modal>
	);

	return (
		<View style={tailwind("bg-white md:mx-32 pb-4 px-4 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			{successModal}
			<View style={tailwind("max-w-md bg-white rounded-xl overflow-hidden md:max-w-md p-3")}>
				<View style={tailwind("md:flex")}>
					<View style={tailwind("w-full p-2")}>
						<UserAvatar size={100} name={`${firstname} ${lastname}`} />
						<Formik
							validationSchema={profileSchema}
							initialValues={{
								id,
								email,
								phone,
								firstname,
								lastname,
								password: "",
								confirmPassword: ""
							}}
							onSubmit={values => {
								dispatch(updateDriverProfile(values))
									.unwrap()
									.then(() => setSuccess("Profile Updated!"));
							}}
						>
							{({ values, handleSubmit, handleChange, handleBlur }) => (
								<View style={tailwind("relative w-full mt-6")}>
									<View style={tailwind('flex flex-row justify-between mb-2')}>
										<View style={{width: "48%"}}>
											<Text style={tailwind("font-medium text-gray-900")}>First Name</Text>
											<TextInput
												defaultValue={firstname}
												autoComplete={"name-given"}
												style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
												placeholder={"Please enter your name"}
												onChangeText={handleChange("firstname")}
												value={values.firstname}
											/>
										</View>
										<View style={{width: "48%"}}>
											<Text style={tailwind("font-medium text-gray-900")}>Last Name</Text>
											<TextInput
												defaultValue={lastname}
												autoComplete={"name-family"}
												style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
												placeholder={"Please enter your name"}
												onChangeText={handleChange("lastname")}
												value={values.lastname}
											/>
										</View>
									</View>
									<View style={tailwind("mb-2")}>
										<Text style={tailwind("font-medium text-gray-900")}>Email</Text>
										<TextInput
											defaultValue={email}
											autoComplete={"email"}
											style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
											onChangeText={handleChange("email")}
											value={values.email}
										/>
									</View>
									<View style={tailwind("mb-2")}>
										<Text style={tailwind("font-medium text-gray-900")}>Phone Number</Text>
										<TextInput
											defaultValue={phone}
											autoComplete={"tel"}
											style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
											onChangeText={handleChange("phone")}
											value={values.phone}
										/>
									</View>
									<View style={tailwind("mb-2")}>
										<Text style={tailwind("font-medium text-gray-900")}>New Password</Text>
										<TextInput
											secureTextEntry
											autoComplete={"password-new"}
											style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
											onChangeText={handleChange("password")}
											value={values.password}
										/>
									</View>
									<View style={tailwind("mb-2")}>
										<Text style={tailwind("font-medium text-gray-900")}>Confirm Password</Text>
										<TextInput
											secureTextEntry
											autoComplete={"password-new"}
											style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
											onChangeText={handleChange("confirmPassword")}
											value={values.confirmPassword}
										/>
									</View>
									<View style={tailwind("mt-8 items-center")}>
										<TouchableOpacity
											style={tailwind("flex items-center justify-center h-12 w-2/3 text-white text-lg bg-primary rounded")}
											onPress={handleSubmit}
										>
											<Text style={tailwind("text-white text-lg")}>Save</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
						</Formik>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	}
});

export default Profile;
