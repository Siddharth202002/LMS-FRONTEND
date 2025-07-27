import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUserCount: 0,
  subscribedUser: 0,
};

export const getStatsData = createAsyncThunk("/stats/get", async () => {
  try {
    const res = axiosInstance.get("/admin/stats/users");
    toast.promise(res, {
      loading: "Getting the stats...",
      success: (data) => {
        return data?.data?.message;
      },

      error: "Failed to load the data stats",
    });

    return (await res)?.data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
  }
});

const statSlice = createSlice({
  name: "statsOfUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUserCount = action?.payload?.stats?.totalUsers;
      state.subscribedUser = action?.payload?.stats?.subscribedUsers;
    });
  },
});

export default statSlice.reducer;
