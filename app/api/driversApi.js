import {secondsServer} from "./server";

const driversApi = secondsServer.injectEndpoints({
	endpoints: (builder => ({
		example: builder.query({
			providesTags: ['Driver'],
			query: () => 'test',
		}),
		login: builder.mutation({
			invalidatesTags: ['Driver'],
			query: (data) => ({
				body: data,
				method: 'POST',
				url: '/server/driver/login'
			})
		}),
		verify: builder.mutation({
			invalidatesTags: ['Driver'],
			query: (data) => ({
				body: data,
				method: 'POST',
				url:'/server/driver/verify'
			})
		})
	})),
	overrideExisting: false,
})

export const { useVerifyMutation, useLoginMutation } = driversApi
