import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {OwnerFeeDetailResultDto, OwnerFeeDetailSearchDto} from "./dto";
import {AppResult, PaginateRequest, PaginateResult} from "../../axios";


export const ownerFeeApi = createApi({
    reducerPath: 'ownerFeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080'
    }),
    tagTypes: ['OwnerFee'],
    endpoints: (builder) => ({
        getOwnerFeeData: builder.query<AppResult<[OwnerFeeDetailResultDto]>, PaginateRequest<OwnerFeeDetailSearchDto>>({
            query: (arg) => (
                console.log(`arg = ${JSON.stringify(arg)}`),
                    {
                        url: '/owner_fee/data',
                        method: 'GET',
                        params: arg
                    }),

            transformResponse: (response: AppResult<[OwnerFeeDetailResultDto]>) => response
        }),
    }),
});
export const {useGetOwnerFeeDataQuery, useLazyGetOwnerFeeDataQuery} = ownerFeeApi