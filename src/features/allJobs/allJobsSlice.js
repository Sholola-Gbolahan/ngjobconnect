import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customFetch from "../../utils/axios"
import { toast } from "react-toastify"

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
// Fetching the initial Values from AllJobs State
    const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

    // Adding the Query to filter with values
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }


    try {
      const resp = await customFetch.get(url)

      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/stats")
      console.log("Stats Data", resp.data)
      return resp.data
    } catch (error) {
      thunkAPI.rejectWithValue(
        error.response.data.msg || "Error fetching Stats"
      )
    }
  }
)

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },

    handleChange: (state, { payload: { name, value } }) => {
      // state.page = 1;
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET ALL JOBS
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages = payload.numOfPages
        state.totalJobs = payload.totalJobs
      })
      .addCase(getAllJobs.rejected, (state, payload) => {
        state.isLoading = false
        toast.error(payload)
      })

      // SHOW STATS
      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { showLoading, hideLoading, handleChange, clearFilters, changePage } =
  allJobsSlice.actions

export default allJobsSlice.reducer
