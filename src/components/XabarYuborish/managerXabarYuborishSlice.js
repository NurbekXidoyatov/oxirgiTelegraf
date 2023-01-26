import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  acceptedmessages:[],
  lengthOfAcceptedMessage : [],
  separeteMessageForManager: {},
  allSendedMessageByM: []
}

export const adminSlice = createSlice({
  name:"acceptedMessagesForManagers",
  initialState,
  reducers : {
    allMessages : (state, {payload}) => {
      state.acceptedmessages = payload
    },
    getLengthOfPageAcceptedMessage: (state, {payload}) => {
      state.lengthOfAcceptedMessage = payload
    },
    getSeparateMessageForManager: (state, {payload}) => {
      state.separeteMessageForManager = payload
    },
    getAllSendedMessagesByManage: (state, {payload}) => {
      state.allSendedMessageByM = payload
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
export const {allMessages, getLengthOfPageAcceptedMessage, getSeparateMessageForManager,getAllSendedMessagesByManage} = actions;
