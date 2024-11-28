import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getUserFromLocalStorage } from "../../utils/LocalStorage"
import { logoutUser } from "../user/userSlice"
import { getAllJobs } from "../allJobs/allJobsSlice"

import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk"

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
}

export const createJob = createAsyncThunk("job/createJob", createJobThunk)

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk)

export const editJob = createAsyncThunk("job/editJob", editJobThunk)

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      //Spreading out initialState, and assigning'location' from localStorage to one of it's value 'JobLocation'
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage.location,
      }
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
  extraReducers: (builder) => {
    builder

      //CREATE JOBS
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success("Job successfully created")
      })
      .addCase(createJob.rejected, (state, payload) => {
        state.isLoading = false
        toast.error(payload)
      })

      // DELETE JOBS
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success("Job deleted....")
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload)
      })

      //EDIT JOB

      .addCase(editJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success("Job Modified....")
      })
      .addCase(editJob.rejected, (state, payload) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions
export default jobSlice.reducer
