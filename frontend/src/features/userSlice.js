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
    logout: (state) => {
      state.userInfo = null
      localStorage.clear()
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
  },
})

export const { logout, setCredentials } = userSlice.actions
export default userSlice.reducer
