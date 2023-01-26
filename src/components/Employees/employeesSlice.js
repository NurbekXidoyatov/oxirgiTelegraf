import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  acceptedMessage:[],
  separateMsg :{},
  allSendedMessages:[],
}

export const adminSlice = createSlice({
  name:"employeesprofile",
  initialState,
  reducers : {
    acceptedMessageFromManager : (state, {payload}) => {
      state.acceptedMessage = payload
    },
    infoOfSeparateMessage : (state, {payload}) => {
      state.separateMsg = payload
    },
    sendedMessagesByEmployee : (state, {payload}) => {
      state.separateMsg = payload
    },
    getAllSendedMessages : (state, {payload}) => {
      state.allSendedMessages = payload
    },

    // deleteAdmin : (state,{payload}) => {
    //   state.admins = state.admins.filter(element => element.id !== payload)
    // },
    // editedAdmin: (state,{payload}) => {
    //   state.singleAdmin = payload
    // },
    // getLengthOfPage: (state, {payload}) => {
    //   state.length = payload
    // },
  }
})

const {actions, reducer} = adminSlice;

export default reducer;
export const {acceptedMessageFromManager, infoOfSeparateMessage,getAllSendedMessages} = actions;
