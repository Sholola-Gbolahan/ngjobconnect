import customFetch from "../../utils/axios"
import { logoutUser } from "./userSlice"

export const registerUSerThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user, thunkAPI)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.msg || "Registration failed"
    )
  }
}

export const loginUSerThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user, thunkAPI)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.msg || "Login failed"
    )
  }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return resp.data
  } catch (error) {
    console.log(error.response)
    if ((error.response.status = 401)) {
      thunkAPI.dispatch(logoutUser())

      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...")
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
