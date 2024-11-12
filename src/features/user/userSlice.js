import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customFetch from "../../utils/axios"
import { toast } from "react-toastify"

const initialState = {
  user: null,
  isLoading: false,
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const LoginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
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
        toast.success(`Hello there ${user.name}`)
      })

      // REJECTED STATE
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      //-------------------// Login Builder //--------------------------
      //PENDING
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true
      })

      //FULFILLED
      .addCase(LoginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
        toast.success(`Welcome Back ${user.name}`)
      })

      //REJECTED
      .addCase(LoginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default userSlice.reducer
