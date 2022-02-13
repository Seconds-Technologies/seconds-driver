import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

/*const secondsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001/api/"
	})
})*/

export const secondsServer = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8081/",
	}),
	endpoints: () => ({}),
	tagTypes: ['Driver'],
	reducerPath: "driver"
})
