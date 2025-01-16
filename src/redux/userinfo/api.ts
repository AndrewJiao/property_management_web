import {AppResult, HOST_WITH_SEC, PaginateRequest} from "../../axios";
import {encode} from "base-64";
import utf8 from "utf8";
import {UserCreateDto, UserDto, UserSearchDto, UserUpdateDto} from "./dto";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import DtoUtil from "../../utils/DtoUtil";

const baseQuery = (arg, api, opt = {}) => {
    if (arg instanceof PaginateRequest) {
        arg = {...arg, param: encode(utf8.encode(JSON.stringify(arg.searchParam)))}
    }
    return fetchBaseQuery({
        baseUrl: HOST_WITH_SEC,
        credentials: 'include'
    })(arg, api, opt);
}


export const userInfoApi =  createApi({
    reducerPath: 'userInfoApi',
    baseQuery,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({
        searchUser: builder.query<AppResult<[UserDto]>, PaginateRequest<UserSearchDto>>({
            query: (arg) => ({
                url: '/user_info/data',
                method: 'GET',
                params: {
                    ...arg,
                    searchParam: JSON.stringify(arg.searchParam),
                    param: encode(utf8.encode(JSON.stringify(arg.searchParam)))
                }
            }),
            transformResponse: (response: AppResult<[UserDto]>) => DtoUtil.apiAppendIdToKey(response),
            providesTags: ['UserInfo']
        }),
        postUser: builder.mutation<AppResult<UserDto>, UserCreateDto>({
            query: (arg) => ({
                url: '/user_info/data',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ['UserInfo']
        }),
        putUer: builder.mutation<AppResult<UserDto>, { id: number, arg: UserUpdateDto }>({
            query: ({id,arg}) => ({
                url: `/user_info/data/${id}`,
                method: 'PUT',
                body: arg
            }),
            invalidatesTags: ['UserInfo']
        }),
        deleteUser: builder.mutation<AppResult<UserDto>, number>({
            query: (id) => ({
                url: `/user_info/data/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserInfo']
        })
    })
})

export const {useDeleteUserMutation, useLazySearchUserQuery, usePostUserMutation, usePutUerMutation} = userInfoApi;
