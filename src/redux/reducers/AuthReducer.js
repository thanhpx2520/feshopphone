import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState: {
    user: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    editAuthData: (state, action) => {
      const dataEdit = action.payload;
      state.user = { ...state.user, ...dataEdit };
    },
    updateRefreshToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    clearAuthData: (state) => {
      state.user = null;
    },
  },
});

export const { setAuthData, clearAuthData, clearCustomer, editAuthData, updateRefreshToken } = AuthReducer.actions;
export default AuthReducer.reducer;
