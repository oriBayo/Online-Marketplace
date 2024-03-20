import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.clear()
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    addError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { cleanError, logout, addError, setCredentials } =
  userSlice.actions
export default userSlice.reducer
