import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	foregroundLocation: false,
	backgroundLocation: true,
}

export const permissions = createSlice({
	name: 'permissions',
	initialState,
	reducers: {
		updatePermissions: (state, action) => {
			console.log(action.payload);
			return { ...state, ...action.payload };
		}
	},
})

export const { updatePermissions } = permissions.actions

export default permissions.reducer;
