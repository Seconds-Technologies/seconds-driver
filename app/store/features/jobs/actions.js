import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall, serverCall } from "../../../api";
import { JOB_STATUS } from "../../../constants";

export const setAllJobs = (state, action) => {
	const currentJobs = action.payload.filter(({ _id, status, routeOptimization }) => ![JOB_STATUS.COMPLETED.name, JOB_STATUS.CANCELLED.name].includes(status) && !routeOptimization);
	const completedJobs = action.payload.filter(({ _id, status }) => status === JOB_STATUS.COMPLETED.name);
	const allJobs = action.payload;
	const routeJobs = action.payload.filter(({ _id, routeOptimization, status }) => routeOptimization &&  ![JOB_STATUS.COMPLETED.name, JOB_STATUS.CANCELLED.name].includes(status));
	const dismissed = action.payload.filter(({ _id, status }) => status === JOB_STATUS.CANCELLED.name);
	return {
		currentJobs,
		completedJobs,
		allJobs,
		routeJobs,
		dismissed
	};
};

export const updateJob = (state, action) => {
	const currentJobs = state.currentJobs.map(job => (job._id === action.payload._id ? action.payload : job));
	const allJobs = state.allJobs.map(job => (job._id === action.payload._id ? action.payload : job));
	const routeJobs = state.routeJobs.map(job => (job._id === action.payload._id ? action.payload : job));
	const completedJobs = state.allJobs
		.map(job => (job._id === action.payload._id ? action.payload : job))
		.filter(job => job.status === JOB_STATUS.COMPLETED);
	return {
		...state,
		currentJobs,
		completedJobs,
		routeJobs,
		allJobs
	};
};

export const removeJob = (state, action) => {
	const cancelledJob = action.payload;
	return {
		...state,
		currentJobs: state.currentJobs.filter(({ _id }) => _id !== cancelledJob._id),
		allJobs: state.allJobs.filter(({ _id }) => _id !== cancelledJob._id),
		completedJobs: [...state.completedJobs],
		dismissed: [...state.dismissed, cancelledJob]
	};
};

let timer = null;
const startSubscription = createAction("timer/start");
const endSubscription = createAction("timer/end");

export const subscribe = createAsyncThunk("timer/start", async (driverId, { dispatch }) => {
	clearInterval(timer);
	dispatch(fetchJobs(driverId));
	timer = setInterval(() => dispatch(fetchJobs(driverId)), 5000);
	dispatch(startSubscription);
});

export const unsubscribe = createAsyncThunk("timer/end", (payload, { dispatch }) => {
	clearInterval(timer);
	dispatch(endSubscription);
});

export const fetchJobs = createAsyncThunk("jobs/fetch-jobs", async (driverId, { dispatch, getState, rejectWithValue }) => {
	try {
		return await apiCall("GET", "/api/v1/jobs", null, {
			params: { driverId: driverId }
		});
	} catch (e) {
		console.log(e);
		return rejectWithValue({ message: e.message });
	}
});

export const acceptJob = createAsyncThunk("jobs/accept-job", async ({ driverId, jobId }, { dispatch, getState, rejectWithValue }) => {
	try {
		return await serverCall("PATCH", "/server/driver/accept", { driverId, jobId });
	} catch (e) {
		console.log(e);
		return rejectWithValue({ message: e.message });
	}
});

export const updateJobStatus = createAsyncThunk("jobs/update-job", async ({ jobId, status }, { rejectWithValue }) => {
	try {
		console.log(jobId, status);
		return await serverCall("PATCH", `/server/driver/update-job`, { jobId, status });
	} catch (err) {
		return rejectWithValue({ message: err.message });
	}
});

export const uploadImage = createAsyncThunk("jobs/upload-proof", async ({ jobId, img, type }, { rejectWithValue }) => {
	try {
		if (type === "photo") {
			const formData = new FormData();
			formData.append("img", img);
			formData.append("jobId", jobId);
			formData.append("type", type);
			const result = await serverCall("POST", `/server/driver/upload-photo`, formData);
			console.log(result);
			return result;
		} else {
			const result = await serverCall("POST", `/server/driver/upload-signature`, { jobId, img, type });
			console.log(result);
			return result;
		}
	} catch (err) {
		return rejectWithValue({ message: err.message });
	}
});

export const downloadDeliveryPhoto = createAsyncThunk("jobs/download-proof", async (filename, { rejectWithValue }) => {
	try {
		return await serverCall("POST", `/server/driver/download-photo`, { filename });
	} catch (err) {
		return rejectWithValue({ message: err.message });
	}
});
