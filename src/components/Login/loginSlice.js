import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false, // Royxatdan otmagan
  isFetched: true, // Loader
  token: localStorage.getItem('token'),
  roles: [],
  loggedInPeople:''
}

export const loginSlice = createSlice({
  name:"logins",
  initialState,
  reducers : {
    nameOfloggedInPeople: (state,{payload}) => {
      state.loggedInPeople = payload;
    },
    requestLogin: (state) => {
      state.isFetched = false;
    },
    successLogin: (state, {payload}) => {
      localStorage.setItem("token", payload);
      state.isFetched = true;
      state.isAuthenticated = true;
      state.token = payload;
    },
    errorLogin: (state) => {
      state.isFetched = true;
    },
    requestProfile: (state) => {
      state.isFetched = false;
    },
    successProfile: (state, {payload}) => {
      state.isFetched = true;
      state.isAuthenticated = true;
      state.roles = payload;
    },
    errorProfile: (state) => {
      state.isFetched = true;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
    },
  }
})

const {actions, reducer} = loginSlice;

export default reducer;
export const { requestLogin, successLogin, errorLogin, requestProfile, successProfile, errorProfile, logout,nameOfloggedInPeople } = actions;
