import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserSearchDto} from "./dto";
import {UserTableDetail} from "../../page/user/list/UserTableDetail";

interface UserInfoState {
    searchParam: UserSearchDto
    touchSearch: number
}

const defaultState: UserInfoState = {
    searchParam: {},
    touchSearch: 0
}

export const userSlice = createSlice({
    name: 'userinfo/slice',
    initialState: defaultState,
    reducers: {
        setSearchParam: (state, action) => {
            state.searchParam = action.payload;
            state.touchSearch++;
        },
        touchUpdate: (state) => {
            state.touchSearch++;
        }
    }
})

export interface UserTableState {
    editingKey: number | null
}

const defaultUserTableState: UserTableState = {
    editingKey: null
}

export const userTableSlice = createSlice({
    name: 'userTable/slice',
    initialState: defaultUserTableState,
    reducers: {
        setEditingKey: (state, action: PayloadAction<number | null>) => {
            state.editingKey = action.payload;
        },
    }
})

