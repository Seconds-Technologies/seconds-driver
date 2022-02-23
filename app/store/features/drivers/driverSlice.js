import {createSlice} from '@reduxjs/toolkit'
import { loginDriver, registerDriver, setDriver, updateDriver, updateDriverProfile } from "./actions";

const initialState = {
	loading: false,
	isAuthenticated: false,
	driver: {
		id: "",
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		businessClients: [],
		vehicle: "",
		status: "",
		verified: false,
	}
}

export const driver = createSlice({
	name: 'drivers',
	initialState,
	reducers: {
		setDriver,
		updateDriver,
	},
	extraReducers: builder => {
		builder
			.addCase(registerDriver.fulfilled, setDriver)
			.addCase(registerDriver.rejected, (state, action) => {
				state.loading = false
				console.log("REJECTED:", action.payload)
			})
			.addCase(loginDriver.fulfilled, setDriver)
			.addCase(loginDriver.rejected, (state, action) => {
				state.loading = false
				console.log("REJECTED:", action.payload)
			})
			.addCase(updateDriverProfile.fulfilled, updateDriver)
			.addCase(updateDriverProfile.rejected, (state, action) => {
				state.loading = false
				console.log("REJECTED:", action.payload)
			})
	}
})

// Action creators are generated for each case reducer function
// export const {setDriver, updateDriver} = driver.actions

export default driver.reducer
