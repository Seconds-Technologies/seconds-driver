import { JOB_STATUS } from "../constants";

export const getColor = status => {
	switch (status) {
		case JOB_STATUS.NEW.name:
			return JOB_STATUS.NEW.colour;
		case JOB_STATUS.PENDING.name:
			return JOB_STATUS.PENDING.colour;
		case JOB_STATUS.DISPATCHING.name:
			return JOB_STATUS.DISPATCHING.colour;
		case JOB_STATUS.EN_ROUTE.name:
			return JOB_STATUS.EN_ROUTE.colour;
		case JOB_STATUS.COMPLETED.name:
			return JOB_STATUS.COMPLETED.colour;
		case JOB_STATUS.CANCELLED.name:
			return JOB_STATUS.CANCELLED.colour;
		default:
			return JOB_STATUS.UNKNOWN.colour;
	}
};

export function capitalize(str) {
	let start = str[0].toUpperCase()
	const lower = str.slice(1).toLowerCase()
	return start.concat(lower);
}
