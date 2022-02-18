export const ENDPOINTS = {
	SERVER: 'server',
	API: 'api'
}

export const STATUS = {
	NEW: {
		colour: '#F44336',
		name: 'new'.toUpperCase()
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
