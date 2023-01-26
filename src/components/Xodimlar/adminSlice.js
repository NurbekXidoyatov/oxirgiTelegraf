import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  admins:[],
  length :[],
  singleAdmin:{},
}

export const adminSlice = createSlice({
  name:"admins",
  initialState,
  reducers : {
    addAdmins : (state, {payload}) => {
      state.admins = payload
    },
    deleteAdmin : (state,{payload}) => {
      state.admins = state.admins.filter(element => element.id !== payload)
    },
    editedAdmin: (state,{payload}) => {
      state.singleAdmin = payload
    },
  }
})

const {actions, reducer} = adminSlice;

export default reducer;
export const {addAdmins, deleteAdmin, editedAdmin} = actions;
