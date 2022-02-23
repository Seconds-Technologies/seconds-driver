import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {apiCall, serverCall} from "../../../api";
import {STATUS} from "../../../constants";

export const setAllJobs = (state, action) => {
	console.log(Date.now())
	const currentJobs = action.payload.filter(({_id, status}) => ![STATUS.COMPLETED.name, STATUS.CANCELLED.name].includes(status))
	const completedJobs = action.payload.filter(({_id, status}) => status === STATUS.COMPLETED.name)
	const allJobs = action.payload;
	const dismissed = action.payload.filter(({_id, status}) => status === STATUS.CANCELLED.name)
	return {
		currentJobs,
		completedJobs,
		allJobs,
		dismissed
	}
}

export const updateJob = (state, action) => {
	console.log("NEW STATUS", action.payload.status);
	return {
		...state,
		currentJobs: state.currentJobs.map(job => job._id === action.payload._id ? action.payload : job),
		completedJobs: action.payload.status === STATUS.COMPLETED.name ? [...state.completedJobs, action.payload] : state.completedJobs,
		allJobs: state.allJobs.map(job => job._id === action.payload._id ? action.payload : job),
	}
}

export const removeJob = (state, action) => {
	const cancelledJob = action.payload
	return {
		currentJobs: state.currentJobs.filter(({_id}) => _id !== cancelledJob._id),
		allJobs: state.allJobs.filter(({_id}) => _id !== cancelledJob._id),
		completedJobs: [...state.completedJobs],
		dismissed: [...state.dismissed, cancelledJob]
	}
}

let timer = null;
const startSubscription = createAction('timer/start')
const endSubscription = createAction('timer/end')

export const subscribe = createAsyncThunk('timer/start', async (driverId,{ dispatch }) => {
	clearInterval(timer);
	dispatch(fetchJobs(driverId));
	timer = setInterval(() => dispatch(fetchJobs(driverId)), 5000);
	console.log(timer);
	dispatch(startSubscription);
});

export const unsubscribe = createAsyncThunk('timer/end',(payload, {dispatch}) => {
	console.log(timer);
	clearInterval(timer);
	dispatch(endSubscription)
});

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
