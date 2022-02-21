import axios from 'axios';
import { REACT_APP_API_BASE_URL, REACT_APP_SERVER_BASE_URL, REACT_APP_ENV_MODE } from "@env"
import {deleteKey} from "../services/keyStore";

const apiAxios = axios.create({
	baseURL: `${REACT_APP_API_BASE_URL}`,
});

const serverAxios = axios.create({
	baseURL: `${REACT_APP_SERVER_BASE_URL}`,
});

export async function setApiKey(token) {
	if (token) {
		apiAxios.defaults.headers.common['X-Seconds-Api-Key'] = token;
		console.log(apiAxios.defaults)
	} else {
		delete apiAxios.defaults.headers.common['X-Seconds-Api-Key'];
		await deleteKey("apiKey")
	}
}

export function setTokenHeader(token) {
	if (token) {
		serverAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete serverAxios.defaults.headers.common['Authorization'];
	}
}

/**
 * A wrapper around axios APIs that formats errors, etc
 * @param method the HTTP verb being used
 * @param path the route path / endpoint
 * @param data (optional) payload in JSON form for POST requests
 * @param config (optional) extra configurations for the request e.g. headers, query params, etc.
 * @returns {Promise<JSON>}
 */
export function serverCall(method, path, data =null, config = {}) {
	return new Promise((resolve, reject) => {
		return !data
			? serverAxios[method.toLowerCase()](path, config)
				.then(res => {
					process.env.REACT_APP_ENV_MODE !== "production" && console.log(res.data);
					resolve(res.data);
				})
				.catch(err => err.response.data.error ? reject(err.response.data.error) : reject(err.response.data))
			: serverAxios[method.toLowerCase()](path, data, config)
				.then(res => {
					process.env.REACT_APP_ENV_MODE !== "production" && console.log(res.data);
					resolve(res.data);
				})
				.catch(err => err.response.data.error ? reject(err.response.data.error) : reject(err.response.data));
	});
}

/**
 * A wrapper around axios APIs that formats errors, etc
 * @param method the HTTP verb being used
 * @param path the route path / endpoint
 * @param data (optional) payload in JSON form for POST requests
 * @param config (optional) extra configurations for the request e.g. headers, query params, etc.
 * @returns {Promise<JSON>}
 */
export function apiCall(method, path, data =null, config={}){
	return new Promise((resolve, reject) => {
		return !data
			? apiAxios[method.toLowerCase()](path, config)
				.then(res => {
					REACT_APP_ENV_MODE !== "production" && console.log(res.data);
					resolve(res.data);
				})
				.catch(err => {
					REACT_APP_ENV_MODE !== "production" && console.error(err);
					err.response.data.error ? reject(err.response.data.error) : reject(err.response.data);
				})
			: apiAxios[method.toLowerCase()](path, data, config)
				.then(res => {
					REACT_APP_ENV_MODE !== "production" && console.log(res.data);
					resolve(res.data);
				})
				.catch(err => {
					REACT_APP_ENV_MODE !== "production" && console.error(err);
					err.response.data.error ? reject(err.response.data.error) : reject(err.response.data);
				});
	})
}
