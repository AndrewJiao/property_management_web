import {AppResult, PaginateRequest} from "../../axios";
import {encode} from "base-64";
import utf8 from "utf8";
import {UserCreateDto, UserDto, UserSearchDto, UserUpdateDto} from "./dto";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = (arg, api, opt = {}) => {
    if (arg instanceof PaginateRequest) {
        arg = {...arg, param: encode(utf8.encode(JSON.stringify(arg.searchParam)))}
    }
    return fetchBaseQuery({
        baseUrl: 'http://localhost:8080'
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
                method: 'Get',
                params: {
                    ...arg,
                    searchParam: JSON.stringify(arg.searchParam),
                    param: encode(utf8.encode(JSON.stringify(arg.searchParam)))
                }
            }),
            transformResponse: (response: AppResult<[UserDto]>) => response
        }),
        postUser: builder.mutation<AppResult<UserDto>, UserCreateDto>({
            query: (arg) => ({
                url: '/user_info/data',
                method: 'POST',
                body: arg
            })
        }),
        putUer: builder.mutation<AppResult<UserDto>, { id: number, arg: UserUpdateDto }>({
            query: ({id,arg}) => ({
                url: `/user_info/data/${id}`,
                method: 'PUT',
                body: arg
            })
        }),
        deleteUser: builder.mutation<AppResult<UserDto>, number>({
            query: (id) => ({
                url: `/user_info/data/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {useDeleteUserMutation, useLazySearchUserQuery, usePostUserMutation} = userInfoApi;
