import "dotenv/config";

export default {
	name: "seconds-driver",
	owner: "seconds-technologies",
	version: "1.0.0",
	extra: {
		apiURL: process.env.API_BASE_URL,
		serverURL: process.env.SERVER_BASE_URL
	},
	hooks: {
		postPublish: [
			{
				file: "sentry-expo/upload-sourcemaps",
				config: {
					organization: "seconds-technologies",
					project: "seconds-driver",
					authToken: "491de6635aa0474b8fb1a44d8589c62232d456c72b8240f889965d6a7fca6e2e"
				}
			}
		]
	},
};
