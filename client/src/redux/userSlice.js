import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Base_Url } from './Base_Url'
import Cookies from 'js-cookie'
const setToken = (token) => {
    return Cookies.set('token', token, { expires: 1 })
}
export const userSlice = createApi({
    reducerPath: 'userSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: Base_Url,
    }),
    tagTypes: ['user'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'user',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({ id, updateUser }) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: updateUser
            }),
            invalidatesTags: ['user']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['user']
        }),
        getUser: builder.query({
            query: () => {
                return {
                    url: 'users',
                    method: 'GET'
                }
            },
            providesTags: ['user']
        }),
        loginUser: builder.mutation({
            query: (logData) => ({
                url: 'user/login',
                method: 'POST',
                body: logData
            }),
            onQueryStarted: async(arg, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    console.log('login token', result);
                    setToken(result.data.token)
                } catch (error) {
                    console.log(`error Loging in: ${error}`);
                }
            },
            invalidatesTags: ['user']
        }),
        getUserAuth: builder.query({
            query: () => {
                return {
                    url: 'user',
                    method: 'GET'
                }
            },
            providesTags: ['user']
        }),
    })
})
export const { useGetUserQuery, useGetUserAuthQuery, useRegisterUserMutation, useDeleteUserMutation, useUpdateUserMutation, useLoginUserMutation } = userSlice;