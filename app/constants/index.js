export const ENDPOINTS = {
	SERVER: 'server',
	API: 'api'
}

export const THEME = {
	PRIMARY: "#9400D3",
	SECONDARY: "#C9C9C9"
}

export const JOB_STATUS = {
	NEW: {
		name: 'new'.toUpperCase(),
		colour: '#F44336'
	},
	PENDING: {
		name: 'pending'.toUpperCase(),
		colour: '#9933CC'
	},
	DISPATCHING: {
		name: 'dispatching'.toUpperCase(),
		colour: '#FF7A00'
	},
	EN_ROUTE: {
		name: 'en-route'.toUpperCase(),
		colour: '#4285F4'
	},
	COMPLETED: {
		name: 'completed'.toUpperCase(),
		colour: '#00FF19'
	},
	CANCELLED: {
		name: 'cancelled'.toUpperCase(),
		colour: '#565656'
	},
	UNKNOWN: {
		name: 'unknown'.toUpperCase(),
		colour: '#795548'
	}
};

export const DRIVER_STATUS = {
	AVAILABLE: 'AVAILABLE',
	BUSY: 'BUSY',
	OFFLINE: 'OFFLINE',
}
