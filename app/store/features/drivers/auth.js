import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiCall, serverCall, setApiKey, setTokenHeader} from "../../../api";
import {saveKey} from "../../../services/keyStore";

export const setDriver = (state, action) => {
	const {
		id,
		clientIds: businessClients,
		phone,
		email,
		firstname,
		lastname,
		status,
		vehicle,
		verified
	} = action.payload
	console.log("Setting driver")
	return {
		isAuthenticated: true,
		driver: {id, businessClients, phone, email, firstname, lastname, status, vehicle, verified}
	}
}

export const registerDriver = createAsyncThunk('drivers/registerDriver', async (payload, {
	dispatch,
	getState,
	rejectWithValue
}) => {
	try {
		const response = await serverCall('POST', '/server/driver/verify', payload)
		console.log(response)
		return response
	} catch (e) {
		console.log(e)
		return rejectWithValue({message: e.message})
	}
});

export const loginDriver = createAsyncThunk('drivers/loginDriver', async (payload, {rejectWithValue}) => {
	try {
		const response = await serverCall('POST', '/server/driver/login', payload)
		await setApiKey(response.apiKey)
		await setTokenHeader(response.token)
		await saveKey("credentials", JSON.stringify({apiKey: response.apiKey, token: response.token}))
		return response
	} catch (e) {
		console.log(e)
		return rejectWithValue({message: e.message})
	}

})
