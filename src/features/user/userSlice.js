import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import customFetch from "../../utils/axios"

const initialState = {
  user: null,
  isLoading: false,
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/testingRegister", user)
      console.log(resp)
    } catch (error) {
      console.log(error.response)
    }
  }
)
export const LoginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log(`Login User ${JSON.stringify(user)}`)
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
})

export default userSlice.reducer
