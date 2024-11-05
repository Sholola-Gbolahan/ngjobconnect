import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoading: false,
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    console.log(`Register User ${JSON.stringify(user)}`)
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
