import 'dotenv/config';

export default {
	name: "seconds-driver",
	version: '1.0.0',
	extra: {
		apiURL: process.env.API_BASE_URL,
		serverURL: process.env.SERVER_BASE_URL,
	},
};
