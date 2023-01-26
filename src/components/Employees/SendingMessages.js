import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { getAllSendedMessages } from './employeesSlice'
import { useHttp } from '../AsyncURL/useHttp'
import Pagination from '../Pagination/Pagination'
import { useQueryParams } from "react-router-query-hooks";
import { UniversalURL } from '../AsyncURL/BaseUrl'
import SendedMessageTableByEMployees from '../table/adminTable/SendedMesssageTableByEmployees'
import DropdownSort from '../dropdownForSelectSort/DropdownSort'
import {sortByMessageSendedByEmployeeToManager} from "../dropdownForSelectSort/SortText"
import LoadingPage from '../loading/Loading'



export default function SendingMessages() {


  const {allSendedMessages} = useSelector(state => state.employeesprofile)
  const { request } = useHttp()
  const dispatch = useDispatch()
  const [query] = useQueryParams();
  const { page } = query;
  const [totalPages, settotalPages] = useState("")
  const [sortText, setSortText] = useState("")


//=========================================================================================================
  const getAllMessages = (currentPage) => {
    request(`${UniversalURL}emp/org/message/find/all?page=${currentPage-1}&size=8&sort=${sortText}`,"GET", null,  {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        dispatch(getAllSendedMessages(response.data.content));
        settotalPages(response.data.totalPages)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAllMessages(page)
  }, [page, sortText]);
//=============================================================================================================

// const chooseAccept = (id) => {
//   request(`${UniversalURL}accepted/message/accept/${id}`, "GET", null, {
//     "Authorization": `Bearer ${localStorage.getItem("token")}`,
//     "Content-type": "application/json"
//   })
//     .then(response => {
//       setshowAcceptbtn(!showAcceptbtn)
//     })
//     .catch(error => console.log(error))
// }
//=============================================================================================================

// const chooseCancel = (id) => {
//   request(`${UniversalURL}accepted/message/cancel/${id}`, "GET", null, {
//     "Authorization": `Bearer ${localStorage.getItem("token")}`,
//     "Content-type": "application/json"
//   })
//     .then(response => {
//       setshowAcceptbtn(!showAcceptbtn)
//     })
//     .catch(error => console.log(error))
// }
//===============================================================================================================
  return (
    <div>
       <div className="input-selection mb-4">
        <DropdownSort setSortText={setSortText} sortBy={sortByMessageSendedByEmployeeToManager} />
      </div>
      {allSendedMessages.length ? <SendedMessageTableByEMployees/> : <LoadingPage/>}
      <Pagination totalPages={totalPages}/>
    </div>
  )
}
