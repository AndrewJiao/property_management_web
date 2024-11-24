import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppResult, PaginateRequest} from "../../axios";
import {PriceBasicDto, REQUEST_PRICE_BASIC} from "../../axios";

export interface PriceBasicState extends HttpBasicState {
    result: AppResult<PriceBasicDto[]>;
    request?: PaginateRequest
}


export const thunkBasicPriceDataGet = createAsyncThunk(
    "priceBasic/getPage",
    async (param: PaginateRequest, thunkAPI) => {
        return await REQUEST_PRICE_BASIC.getData<PriceBasicDto[]>(param.currentPage, param.pageSize)
            .then((e) => {
                return e.data
            })
    }
)

export const basicPriceSlice = createSlice({
    name: "priceBasic",
    initialState: default_pending(),
    reducers: {
        putDataResponseUpdate: (state, action) => {
            if (state.result.data) {
                let index = state.result.data.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.result.data[index] = action.payload;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkBasicPriceDataGet.fulfilled,
            (state, action) => {
                return default_success(action.payload);
            })
            .addCase(thunkBasicPriceDataGet.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkBasicPriceDataGet.pending,
                (state) => {
                    return default_pending()
                })
    }

})