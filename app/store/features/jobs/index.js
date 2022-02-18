import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {apiCall, serverCall} from "../../../api";
import {STATUS} from "../../../constants";

export const setAllJobs = (state, action) => {
	console.log("SETTING JOBS")
	const currentJobs = action.payload.filter(({_id, status}) => [STATUS.DISPATCHING.name, STATUS.EN_ROUTE.name].includes(status))
	const allJobs = action.payload.filter(({_id, status}) => [STATUS.NEW, STATUS.PENDING].includes(status))
	const dismissed = action.payload.filter(({_id, status}) => status === STATUS.CANCELLED.name)
	return {
		currentJobs,
		allJobs,
		dismissed
	}
}

export const updateJob = (state, action) => {
	console.log("UPDATING JOB")
	const updatedJob = action.payload
	return {
		currentJobs: state.currentJobs,
		allJobs: state.allJobs,
		dismissed: state.dismissed
	}
}

export const removeJob = (state, action) => {
	console.log("REMOVING JOB")
	const cancelledJob = action.payload
	return {
		currentJobs: state.currentJobs.filter(({_id}) => _id !== cancelledJob._id),
		allJobs: state.allJobs.filter(({_id}) => _id !== cancelledJob._id),
		dismissed: [...state.dismissed, cancelledJob]
	}
}

export const fetchJobs = createAsyncThunk('jobs/fetch-jobs', async (driverId, {
	dispatch,
	getState,
	rejectWithValue
}) => {
	try {
		return await apiCall('GET', '/api/v1/jobs', null, {
			params: {driverId: driverId}
		})
	} catch (e) {
		console.log(e)
		return rejectWithValue({message: e.message})
	}
});

export const acceptJob = createAsyncThunk('jobs/accept-job', async ({driverId, jobId}, {
	dispatch,
	getState,
	rejectWithValue
}) => {
	try {
		return await serverCall('PATCH', '/server/driver/accept', { driverId, jobId })
	} catch (e) {
		console.log(e)
		return rejectWithValue({message: e.message})
	}
});

export const updateJobStatus = createAsyncThunk('jobs/update-job', async({jobId, status}, {
	rejectWithValue
}) => {
	try {
		console.log(jobId, status);
		return await serverCall('PATCH', `/server/driver/update-job`, { jobId, status } )
	} catch (err) {
		console.log(err.message)
		return rejectWithValue({message: err.message})
	}
});
