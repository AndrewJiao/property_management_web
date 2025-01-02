import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AppResult, HOST_WITH_SEC, PaginateRequest} from "../../axios";
import {encode} from "base-64";
import utf8 from "utf8";
import {ApproveActionDto, ApproveDto, ApproveSearchDto} from "./dto";
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

export const approveApi = createApi({
    reducerPath: 'approveApi',
    baseQuery,
    tagTypes: ['Approve'],
    endpoints: (builder) => ({
        getApprove: builder.query<AppResult<[ApproveDto]>, PaginateRequest<ApproveSearchDto>>({
            query: (arg) => ({
                url: '/approve/data',
                method: 'GET',
                params: {
                    ...arg,
                    searchParam: JSON.stringify(arg.searchParam),
                    param: encode(utf8.encode(JSON.stringify(arg.searchParam)))
                },
            }),
            transformResponse: (response: AppResult<[ApproveDto]>) => DtoUtil.apiAppendIdToKey(response),
            providesTags: ['Approve']
        }),
        changeState: builder.mutation<AppResult<ApproveDto>, { id: number, arg: ApproveActionDto }>({
            query: ({id, arg}) => ({
                url: `/approve/action/${id}`,
                method: 'PUT',
                body: arg
            }),
            invalidatesTags: ['Approve']
        })
    })
})
const {useChangeStateMutation, useLazyGetApproveQuery} = approveApi;

export default {useChangeStateMutation, useLazyGetApproveQuery, approveApi};