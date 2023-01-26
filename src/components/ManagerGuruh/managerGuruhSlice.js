import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  groups:[],
  lengthGroup :[],
  emloyees : {},
  singleGroup:{}
}

export const adminSlice = createSlice({
  name:"groups",
  initialState,
  reducers : {
    addGroups : (state, {payload}) => {
      state.groups = payload
    },
    deleteGroup : (state,{payload}) => {
      state.groups = state.groups.filter(element => element.id !== payload)
    },
    editedGroup: (state,{payload}) => {
      state.singleGroup = payload
    },
    getLengthOfPageManager: (state, {payload}) => {
      state.lengthGroup = payload
    },
  }
})

const {actions, reducer} = adminSlice;

export default reducer;
export const {addGroups, deleteGroup, editedGroup, getLengthOfPageManager} = actions;
