import { REMOVE_CURRENT_DRIVER, SET_CURRENT_DRIVER, UPDATE_CURRENT_DRIVER } from '../actionTypes';

export const DEFAULT_STATE = {
	isAuthenticated: false, //be true when driver logged in
	driver: {
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		vehicle: "",
		status: ""
	}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_DRIVER:
			return {
				isAuthenticated: Object.keys(action.driver).length > 0,
				driver: { ...state.driver, ...action.driver },
			};
		case UPDATE_CURRENT_DRIVER:
			return {
				...state,
				driver: { ...state.driver, ...action.data },
			};
		case REMOVE_CURRENT_DRIVER:
			return DEFAULT_STATE;
		default:
			return state;
	}
};
