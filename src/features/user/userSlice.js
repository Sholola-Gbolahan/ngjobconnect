import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customFetch from "../../utils/axios"
import { toast } from "react-toastify"
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/LocalStorage"

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  isSidebarOpen: false,
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.msg || "Registration failed"
      )
    }
  }
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.msg || "Login failed"
      )
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },

  extraReducers: (builder) => {
    builder
      //-------------------// Register Builder //--------------------------
      // PENDING STATE
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      //FULFILLED STATE
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Hello there ${user.name}`)
      })

      // REJECTED STATE
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      //-------------------// Login Builder //--------------------------
      //PENDING
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })

      //FULFILLED
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`)
      })

      //REJECTED
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
