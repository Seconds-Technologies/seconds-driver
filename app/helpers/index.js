import { STATUS } from "../constants";

export const getColor = status => {
	switch (status) {
		case STATUS.NEW.name:
			return STATUS.NEW.colour;
		case STATUS.PENDING.name:
			return STATUS.PENDING.colour;
		case STATUS.DISPATCHING.name:
			return STATUS.DISPATCHING.colour;
		case STATUS.EN_ROUTE.name:
			return STATUS.EN_ROUTE.colour;
		case STATUS.COMPLETED.name:
			return STATUS.COMPLETED.colour;
		case STATUS.CANCELLED.name:
			return STATUS.CANCELLED.colour;
		default:
			return STATUS.UNKNOWN.colour;
	}
};

export function capitalize(str) {
	let start = str[0].toUpperCase()
	const lower = str.slice(1).toLowerCase()
	return start.concat(lower);
}
