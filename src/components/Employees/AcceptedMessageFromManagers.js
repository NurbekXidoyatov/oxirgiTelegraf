import React,{useEffect, useState} from 'react'
import {useHttp} from "../AsyncURL/useHttp"
import {  useDispatch, useSelector } from 'react-redux';
import { acceptedMessageFromManager} from "./employeesSlice"
import Pagination from '../Pagination/Pagination';
import { useQueryParams } from "react-router-query-hooks";
import { UniversalURL } from '../AsyncURL/BaseUrl';
import AcceptedMessageTableFromManagerToEmployee from '../table/adminTable/AcceptedMessageTableFromManagerToEmployee';
import SeparateMessage from './SeparateMessage';
import DropdownSort from '../dropdownForSelectSort/DropdownSort';
import {sortByMessageAcceptedFromManagerToEmployee} from "../dropdownForSelectSort/SortText"
import LoadingPage from '../loading/Loading';
import "./employees.css"


export default function AcceptedMessageFromManagers() {


  const {acceptedMessage} = useSelector(state => state.employeesprofile)
  const {request} = useHttp();
  const dispatch = useDispatch();
  const [query] = useQueryParams();
  const { page } = query;
  const [totalPages, settotalPages] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [value, setValue] = useState(true);
  const [sortText, setSortText] = useState("")

  const ShowModalFunction = () => {
    setShowModal(!showModal)
  }

  const getAllMessages = (currentPage) => {
    request(`${UniversalURL}emp/message/find/all?page=${currentPage-1}&size=8&sort=${sortText}`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        dispatch(acceptedMessageFromManager(response.data.content));
        settotalPages(response.data.totalPages)

      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAllMessages(page)
    setValue(value)
  }, [page, sortText]);


  return (
    <div>
      <div className="input-selection mb-4">
        <DropdownSort setSortText={setSortText} sortBy={sortByMessageAcceptedFromManagerToEmployee} />
      </div>
      {showModal ? <SeparateMessage ShowModalFunction={ShowModalFunction}/> : null}
      {acceptedMessage.length ?  <AcceptedMessageTableFromManagerToEmployee ShowModalFunction={ShowModalFunction}/> : <LoadingPage/>}
      <div className="refresh_btn_wrapper">
        <Pagination totalPages={totalPages} />
        <button onClick={() => setValue(!value)} className="refresh_btn">
          Refresh
        </button>
      </div>
    </div>
  )
}
