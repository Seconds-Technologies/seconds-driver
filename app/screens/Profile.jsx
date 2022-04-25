import React, { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "@env";
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Pressable, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateDriverProfile } from "../store/features/drivers/actions";
import Modal from "react-native-modal";
import { profileSchema } from "../validation";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const Profile = props => {
	const tailwind = useTailwind();
	const dispatch = useDispatch();
	const [successMessage, setSuccess] = useState("");
	const [image, setImage] = useState(null);
	const {
		id,
		firstname,
		lastname,
		phone,
		email,
		vehicle,
		profileImageData
	} = useSelector(state => state["drivers"].driver);
	const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

	const pickImage = async () => {
		await requestPermission();
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});
		console.log(result);
		return result;
	};

	const successModal = (
		<Modal isVisible={!!successMessage} onBackdropPress={() => setSuccess("")}
		       onBackButtonPress={() => setSuccess("")}>
			<View style={tailwind("flex items-center justify-center m-10")}>
				<View style={styles.modalView}>
					<Text style={tailwind("text-center text-xl")}>{successMessage}</Text>
				</View>
			</View>
		</Modal>
	);

	return (
		<View
			style={tailwind("bg-white md:mx-32 pb-4 px-4 border-0 md:border-4 border-gray-300 md:rounded-xl min-h-full")}>
			{successModal}
			<View style={tailwind("max-w-md bg-white rounded-xl overflow-hidden md:max-w-md p-3")}>
				<View style={tailwind("md:flex")}>
					<View style={tailwind("w-full p-2")}>
						<Formik
							enableReinitialize
							validationSchema={profileSchema}
							initialValues={{
								id,
								email,
								phone,
								firstname,
								lastname,
								password: "",
								confirmPassword: "",
								profileImageData
							}}
							onSubmit={async values => {
								try {
									let { profileImageData, ...payload} = values
									if (image) {
										const info = await FileSystem.uploadAsync(`${SERVER_BASE_URL}/server/driver/upload-profile-picture`, image.uri, {
											uploadType: FileSystem.FileSystemUploadType.MULTIPART,
											fieldName: "img",
											mimeType: "image/jpeg",
											parameters: {
												id
											}
										});
										console.log(info);
									}
									const result = await dispatch(updateDriverProfile(payload)).unwrap();
									console.log("Profile Updated!");
									setSuccess("Profile Updated!");
								} catch (err) {
									console.log(err.message);
								}
							}}
						>
							{({ values, errors, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
								<View style={tailwind("relative w-full")}>
									<View style={tailwind("flex items-center mb-4")}>
										{values.profileImageData ? (
											<TouchableOpacity activeOpacity={0.75} onPress={() =>
												pickImage().then(res => {
													if (!res.cancelled) {
														setImage(prevState => ({
															name: `${shorthash.unique(res.uri)}.jpg`,
															uri: res.uri
														}));
														setFieldValue("profileImageData", res.uri);
													}
												})}>
												<Image
													style={tailwind("h-24 w-24 rounded-full")}
													source={{ uri: values.profileImageData }}
												/>
											</TouchableOpacity>
										) : (
											<TouchableOpacity
												activeOpacity={0.75}
												style={tailwind("flex items-center justify-center rounded-full bg-gray-200 w-24 h-24")}
												onPress={() =>
													pickImage().then(res => {
														if (!res.cancelled) {
															setImage(prevState => ({
																name: `${shorthash.unique(res.uri)}.jpg`,
																uri: res.uri
															}));
															setFieldValue("profileImageData", res.uri);
														}
													})}
											>
												<Entypo name="camera" size={30} color="black" />
											</TouchableOpacity>)}
									</View>
									<View style={tailwind("flex flex-row justify-between mb-2")}>
										<View style={{ width: "48%" }}>
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
										<View style={{ width: "48%" }}>
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
										<Text style={tailwind("font-medium text-gray-900")}>
											{errors["password"] &&
												<Text style={tailwind("text-danger")}>*&nbsp;</Text>}
											New Password
										</Text>
										<TextInput
											secureTextEntry
											autoComplete={"password-new"}
											style={tailwind("flex w-full px-4 py-3 mt-2 text-xl bg-gray-200 rounded-lg")}
											onChangeText={handleChange("password")}
											value={values.password}
										/>
									</View>
									<View style={tailwind("mb-2")}>
										<Text style={tailwind("font-medium text-gray-900")}>
											{errors["confirmPassword"] &&
												<Text style={tailwind("text-danger")}>*&nbsp;</Text>}Confirm Password
										</Text>
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
											style={tailwind("flex items-center justify-center h-12 w-2/3 text-white text-lg bg-pending-400 rounded")}
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
