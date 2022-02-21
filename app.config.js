import 'dotenv/config';

export default {
	name: "seconds-driver",
	version: '1.0.0',
	android: {
		package: 'com.secondstechnologies.secondsdriver'
	},
	extra: {
		apiURL: process.env.REACT_APP_API_BASE_URL,
		serverURL: process.env.REACT_APP_SERVER_BASE_URL,
	},
};
