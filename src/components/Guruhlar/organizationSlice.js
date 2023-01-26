import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  organizations:[],
  departments:[],
  length:[],
}

export const adminSlice = createSlice({
  name:"organizations",
  initialState,
  reducers : {
    addOrganization : (state, {payload}) => {
      state.organizations = payload
    },
    getDeepartmentId : (state, {payload}) => {
      state.departments = payload
    },
    deleteorganization : (state,{payload}) => {
      state.organizations = state.organizations.filter(element => element.id !== payload)
    },
    lengthOfPageKorxonalar: (state, {payload}) => {
      state.length = payload
    },
    // editedAdmin: (state,{payload}) => {
    //   state.singleAdmin = payload
    // }
  }
})

const {actions, reducer} = adminSlice;

export default reducer;
export const {addOrganization, deleteorganization, getDeepartmentId, lengthOfPageKorxonalar} = actions;
