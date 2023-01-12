import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    intialData: [],
    status: [],
    error: ''
}

export const fetchData = createAsyncThunk("fetchData",
    async (payload) => {
        try {
            const res = await axios.get(`http://websitework.in/spacex_api/index.php?action=getCampaign`,
            {params:payload})
            return res.data
        } catch (err) {
            return err;
        }
    })
 
    // export const fetchSearchData = createAsyncThunk("fetchSearchData",
    // async (fields) => {
    //     try {
    //         const res = await axios.get(`http://websitework.in/spacex_api/index.php?action=getCampaign`,
    //         {params:{type: fields.type_options, status: fields.status_options, original_date : fields.original_launch_options}})
    //         console.log(res.data)
    //         return res.data
    //     } catch (err) {
    //         return err;
    //     }
    // })
    

export const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.status = "Pending"
        })

        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.status = "Success"
            state.intialData = action.payload
        })

        builder.addCase(fetchData.rejected, (state, action) => {
            state.error = action.payload
            state.status = "Fail"
        })
    }
})

export default dataSlice.reducer;