import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  departments:[],
  length : [],
  singleAdmin:{}
}

export const departmentSlice = createSlice({
  name:"departments",
  initialState,
  reducers : {
    addDepartment : (state, {payload}) => {
      state.departments = payload
    },
    deleteDepartment : (state,{payload}) => {
      state.departments = state.departments.filter(element => element.id !== payload)
    },
    // editedAdmin: (state,{payload}) => {
    //   state.singleAdmin = payload
    // }
  }
})

const {actions, reducer} = departmentSlice;

export default reducer;
export const {addDepartment, deleteDepartment} = actions;
