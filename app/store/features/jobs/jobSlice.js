import {createSlice} from '@reduxjs/toolkit'
import {
	acceptJob,
	fetchJobs,
	removeJob,
	setAllJobs,
	updateJob,
	updateJobStatus,
	uploadSignature
} from "./actions";
import { JOB_STATUS } from "../../../constants";

const initialState = {
	allJobs: [],
	currentJobs: [],
	completedJobs: [],
	routeJobs: [],
	dismissed: []
}

export const job = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		setAllJobs,
		updateJob,
		removeJob
	},
	extraReducers: builder => {
		builder
			.addCase(fetchJobs.fulfilled, setAllJobs)
			.addCase(fetchJobs.rejected, (state, action) => {
				console.log("REJECTED:", action.payload)
			})
			.addCase(acceptJob.fulfilled, updateJob)
			.addCase(acceptJob.rejected, (state, action) => {
				console.log("REJECTED", action.payload)
			})
			.addCase(updateJobStatus.fulfilled, (state, action) => {
				return action.payload["status"] === JOB_STATUS.CANCELLED ? removeJob(state, action) : updateJob(state, action)
			})
			.addCase(updateJobStatus.rejected, (state, action) => {
				console.log("REJECTED", action.payload)
			})
			.addCase(uploadSignature.fulfilled, updateJob)
			.addCase(uploadSignature.rejected, (state, action) => {
				console.log("REJECTED", action.payload)
			})
	}
})

// Action creators are generated for each case reducer function
// export const {setDriver, updateDriver} = driver.actions

export default job.reducer
