import React, {useState, useEffect} from 'react'
import {  useDispatch } from 'react-redux';
import { useQueryParams } from "react-router-query-hooks";
import Overlay from '../Xodimlar/Overlay';
import "./guruhlar.css"
import GuruhQowiw from './GuruhQowiw'
import { useHttp } from '../AsyncURL/useHttp';
import { addOrganization } from './organizationSlice';
import Pagination from '../Pagination/Pagination';
import { UniversalURL } from '../AsyncURL/BaseUrl';
import KorxonaTable from '../table/adminTable/KorxonaTable';
import ButtonBlue from '../buttons/ButtonBlue';
import { sortByOrg } from '../dropdownForSelectSort/SortText';
import DropdownSort from '../dropdownForSelectSort/DropdownSort';
import LoadingPage from "../loading/Loading"

export default function Guruhlar() {

  const [showguruhQowiw, setshowguruhQowiw] = useState(false);
  const [totalPage, setTotalPage] = useState("");
  const [sortText, setSortText] = useState("");
  const [status, setStatus] = useState("")
  const [query] = useQueryParams();

  const { page } = query;

  const showguruhqowiwlist=()=>{
    setshowguruhQowiw(!showguruhQowiw)
  }
  const {request} = useHttp();
  const dispatch = useDispatch()

  //================================================get All Organization==================================
  const getAllOrganization = (currentPage) => {
    request(`${UniversalURL}organization/find/all?page=${currentPage-1}&size=8&sort=${sortText}`, "GET", null, {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      "Content-type":"application/json"
    })
    .then(response => {
      dispatch(addOrganization(response.data.content))
      setTotalPage(response.data.totalPages)
      setStatus(response.ok)

    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getAllOrganization(page)
  }, [page, sortText]);

  return (
    <div className='wrapper-guruhlar'>
      {showguruhQowiw ? <Overlay/> : null}
      <div className="table-header">
        <h2 className='table-header-heading'>Korxonalar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showguruhqowiwlist}>
            Korxona yaratish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
       <DropdownSort setSortText={setSortText} sortBy={sortByOrg}/>
      </div>
     {status ?  <KorxonaTable/> : <LoadingPage/>}
      <Pagination totalPages={totalPage} />
      {showguruhQowiw ? <GuruhQowiw showguruhqowiwlist={showguruhqowiwlist} page={page} getAllOrganization={getAllOrganization}/> : null}
    </div>
  )
}
