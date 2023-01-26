import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  managers:[],
  length:[],
  orginalID:[],
  singleManager:{},
}

export const adminSlice = createSlice({
  name:"managers",
  initialState,
  reducers : {
    addManager : (state, {payload}) => {
      state.managers = payload
    },
    getOrgID : (state, {payload}) => {
      state.orginalID = payload
    },
    deleteManager : (state,{payload}) => {
      state.managers = state.managers.filter(element => element.id !== payload)
    },
    editedManager: (state,{payload}) => {
      state.singleManager = payload
    },
  }
})

const {actions, reducer} = adminSlice;

export default reducer;
export const {addManager, getOrgID, deleteManager,editedManager } = actions;
