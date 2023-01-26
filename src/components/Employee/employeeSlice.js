import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  employees:[],
  length :[],
  singleEmployee:{}
}

export const adminSlice = createSlice({
  name:"employees",
  initialState,
  reducers : {
    addEmployees : (state, {payload}) => {
      state.employees = payload
    },
    deleteEmployees : (state,{payload}) => {
      state.employees = state.employees.filter(element => element.id !== payload)
    },
    editedEmployees: (state,{payload}) => {
      state.singleEmployee = payload
    },
    getLengthOfPage: (state, {payload}) => {
      state.length = payload
    },
  }
})

const {actions, reducer} = adminSlice;

export default reducer;
export const {addEmployees, deleteEmployees, editedEmployees, getLengthOfPage} = actions;
