import React,{useEffect, useState} from 'react'
import { useHttp } from '../AsyncURL/useHttp'
import Pagination from '../Pagination/Pagination';
import { useQueryParams } from "react-router-query-hooks";
import XabarYuborish from './XabarYuborish';
import Overlay from "../Xodimlar/Overlay"
import {UniversalURL} from "../AsyncURL/BaseUrl"
import ButtonBlue from '../buttons/ButtonBlue';
import SendedMessageByManagerTable from '../table/adminTable/SendedMessageByManagerTable';
import "./XabarYuborish.css"
import DropdownSort from '../dropdownForSelectSort/DropdownSort';
import { sortByMessageSendedToEmployees } from '../dropdownForSelectSort/SortText';
import LoadingPage from '../loading/Loading';


export default function SendedMessageBYManager() {

  const {request} = useHttp()
  const [showSendingMessage, setshowSendingMessage] = useState(true);
  const [totalPage, setTotalPage] = useState("")
  const [sortText, setSortText] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [status, setStatus] = useState("")
  const [query] = useQueryParams();
  const { page } = query;


  const showBasket = () => {
    setshowSendingMessage(!showSendingMessage)
  }

  //==================================================== GET ALL MESSAGES ===========================================

  const getAllMessages = (currentPage) => {
    request(`${UniversalURL}message/find/all?page=${currentPage-1}&size=8&sort=${sortText}`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        setAllMessages(response.data.content)
        setTotalPage(response.data.totalPages)
        setStatus(response.ok)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAllMessages(page)
  }, [page, sortText]);

  return (
    <div className='sending_messages_wrapper'>
    {!showSendingMessage ? <Overlay/> : null}
      <div className="table-header">
        <h2 className='table-header-heading'>Yuborilgan Xabarlar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showBasket}>
            Xabar yuborish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
      <DropdownSort setSortText={setSortText} sortBy={sortByMessageSendedToEmployees} />
      </div>
      {status ?   <SendedMessageByManagerTable allMessages={allMessages}/> : <LoadingPage/>}
      {!showSendingMessage ? <XabarYuborish page={page} getAllMessages={getAllMessages}  showBasket={showBasket} /> : null}
      <Pagination  totalPages={totalPage} />
    </div>
  )
}
