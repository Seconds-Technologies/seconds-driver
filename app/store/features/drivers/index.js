import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const setDriver = (state, action) => {
	const {
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
		driver: {businessClients, phone, email, firstname, lastname, status, vehicle, verified}
	}
}

export const registerDriver = createAsyncThunk('drivers/setDriver', async (payload, {
	dispatch,
	getState,
	rejectWithValue
}) => {
	try {
		const response = (await axios.post('http://localhost:8081/server/driver/verify', payload)).data
		console.log(response)
		return response
	} catch (e) {
		let {message} = e.response.data.error
		return rejectWithValue({code: e.response.status, message})
	}
});

export const loginDriver = createAsyncThunk('drivers/setDriver', async (payload, {rejectWithValue}) => {
	try {
		const response = (await axios.post('http://localhost:8081/server/driver/login', payload)).data
		console.log(response)
		return response
	} catch (e) {
		let {message} = e.response.data.error
		return rejectWithValue({code: e.response.status, message})
	}

})
