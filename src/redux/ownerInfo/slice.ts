import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AppResult,
    axiosAppendIdToKey,
    axiosGetContent,
    OwnerInfoDto,
    OwnerInfoInsertDto,
    OwnerInfoSearchDto,
    PaginateRequest,
    PriceBasicDto,
    REQUEST_OWNER_INFO,
} from "../../axios";

export interface OwnerInfoState extends HttpBasicState {
    result: AppResult<PriceBasicDto[]>;
    request?: PaginateRequest<OwnerInfoSearchDto>
}


export const thunkOwnerInfoDataGet = createAsyncThunk(
    "ownerInfo/getPage",
    async (param: PaginateRequest<OwnerInfoSearchDto>, thunkAPI) => {
        if (!param.searchParam) {
            param.searchParam = {roomNumber: "", ownerName: ""}
        }
        return await REQUEST_OWNER_INFO.getData<OwnerInfoDto[]>(param)
            .then(e => {
                let data = e.data.data;
                data.forEach(e => {
                    e["otherBasic.carNumber"] = e.otherBasic.carNumber;
                    e["otherBasic.motorCycleNumber"] = e.otherBasic.motorCycleNumber;
                })
                return e
            })
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
    }
)

export const thunkOwnerInfoInsert = createAsyncThunk(
    "ownerInfo/getPage",
    async (param: OwnerInfoInsertDto, thunkAPI) => {
        return await REQUEST_OWNER_INFO.postData(param)
            .then(e => {
                let data = e.data.data;
                // data.for(e => {
                //     e["otherBasic.carNumber"] = e.otherBasic.carNumber;
                //     e["otherBasic.motorCycleNumber"] = e.otherBasic.motorCycleNumber;
                // })
                return e
            })
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
    }
)

export const ownerInfoSlice = createSlice({
    name: "ownerInfo",
    initialState: default_pending(),
    reducers: {
        putDataResponseUpdate: (state, action) => {
            if (state.result.data) {
                let index = state.result.data.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    console.log(`action = ${JSON.stringify(action.payload)}`)
                    state.result.data[index] = action.payload;
                }
            }


        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkOwnerInfoDataGet.fulfilled,
            (state, action) => {
                return default_success(action.payload);
            })
            .addCase(thunkOwnerInfoDataGet.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkOwnerInfoDataGet.pending,
                (state) => {
                    return default_pending()
                })
    }

})
