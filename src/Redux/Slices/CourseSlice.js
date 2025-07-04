import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("get/courses", () => {
  try {
    const response = axiosInstance.get("/courses");
    toast(response, {
      loading: "Courses are loading...",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });

    return response?.data?.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default courseSlice.reducer;
