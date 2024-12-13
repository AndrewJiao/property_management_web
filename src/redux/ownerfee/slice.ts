import {BaseQueryArg, BaseQueryMeta, BaseQueryResult, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {OwnerFeeDetailCreateDto, OwnerFeeDetailResultDto, OwnerFeeDetailSearchDto} from "./dto";
import {AppResult, PaginateRequest} from "../../axios";
import {encode} from "base-64";
import utf8 from "utf8";
import * as url from "node:url";

const baseQuery = (arg, api, opt = {}) => {
    if (arg instanceof PaginateRequest) {
        arg = {...arg, param: encode(utf8.encode(JSON.stringify(arg.searchParam)))}
    }
    return fetchBaseQuery({
        baseUrl: 'http://localhost:8080'
    })(arg, api, opt);
}

export const ownerFeeApi = createApi({
    reducerPath: 'ownerFeeApi',
    baseQuery,
    tagTypes: ['OwnerFee'],
    endpoints: (builder) => ({
        getOwnerFeeData: builder.query<AppResult<[OwnerFeeDetailResultDto]>, PaginateRequest<OwnerFeeDetailSearchDto>>({
            query: (arg) => (
                {
                    url: '/owner_fee/data',
                    method: 'GET',
                    params: {
                        ...arg,
                        searchParam: JSON.stringify(arg.searchParam),
                        param: encode(utf8.encode(JSON.stringify(arg.searchParam)))
                    }
                }
            ),
            transformResponse: (response: AppResult<[OwnerFeeDetailResultDto]>) => response
        }),
        createOwnerFeeData: builder.mutation<AppResult<OwnerFeeDetailResultDto>, OwnerFeeDetailCreateDto>({
            query(arg) {
                return {
                    url: '/owner_fee/data',
                    method: 'POST',
                    body: arg
                }
            },
        }),
        createOwnerFeeDataAll: builder.mutation<AppResult<void>, OwnerFeeDetailCreateDto>({
            query(arg) {
                return {
                    url: '/owner_fee/datas',
                    method: 'POST',
                    body: arg
                }
            }
        }),
    }),
});
export const {
    useGetOwnerFeeDataQuery,
    useLazyGetOwnerFeeDataQuery,
    useCreateOwnerFeeDataMutation,
    useCreateOwnerFeeDataAllMutation
} = ownerFeeApi