import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoading: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
})

export default userSlice.reducer
