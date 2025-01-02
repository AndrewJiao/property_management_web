import {createSlice} from "@reduxjs/toolkit";
import {ApproveSearchDto} from "./dto";
interface ApproveState {
    searchParam: ApproveSearchDto,
    touchSearch: number,
}
const defaultState: ApproveState = {
    searchParam: {},
    touchSearch: 0
}

export const approveSlice = createSlice({
    name: 'approve',
    initialState: defaultState,
    reducers: {
        setSearchParam(state, action) {
            state.searchParam = action.payload;
            state.touchSearch ++;
        },
        touchUpdate(state) {
            state.touchSearch ++;
        }
    }
});

export default {approveSlice};