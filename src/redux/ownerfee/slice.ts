import {createSlice} from "@reduxjs/toolkit";
import {OwnerFeeDetailSearchDto} from "./dto";

export interface OwnerFeeState {
    searchParam: OwnerFeeDetailSearchDto
    touchSearch: number
}

const defaultState: OwnerFeeState = {
    searchParam: {},
    touchSearch: 0
}


export const ownerFeeSlice = createSlice({
    name: 'ownerFee/slice',
    initialState: defaultState,
    reducers: {
        setSearchParam(state, action) {
            state.searchParam = action.payload;
            state.touchSearch++;
        },
        touchUpdate(state) {
            state.touchSearch++;
        }
    }
})