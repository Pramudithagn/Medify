import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  userRole: null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.userRole = action.payload.userRole;
      state.userName = action.payload.userName;
    },
    clearUserDetails(state) {
      state.userDetails = null;
      state.userRole = null;
      state.userName = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = authSlice.actions;
export default authSlice.reducer;
