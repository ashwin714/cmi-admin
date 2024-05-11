import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {    
    isLoadingTrue: (state) => {
      state.isLoading=false;
      alert("loading")
    },
    isLoadingFalse: (state) => {
      state.isLoading =false
    },
  },
})

// Action creators are generated for each case reducer function
export const { isLoadingTrue, isLoadingFalse } = loadingSlice.actions

export default loadingSlice.reducer