import {createSlice} from "@reduxjs/toolkit";
import {OwnerFeeDetailSearchDto} from "./dto";

export interface OwnerFeeState {
    isLoading: boolean
    tableCanFetchData: boolean
    searchParam: {}
}

const defaultState: OwnerFeeState = {
    isLoading: true,
    tableCanFetchData: true,
    searchParam: {}
}


export const ownerFeeSlice = createSlice({
    name: 'ownerFee/slice',
    initialState: defaultState,
    reducers: {
        setTableLoading(state, action) {
            state.isLoading = action.payload;
        },
        setSearchParam(state, action) {
            state.searchParam = action.payload;
        }
    }
})