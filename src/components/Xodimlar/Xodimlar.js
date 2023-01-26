import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import ButtonBlue from '../buttons/ButtonBlue';
import AdminqowiwForm from './AdminqowiwForm'
import { useQueryParams } from "react-router-query-hooks";
import { useHttp } from '../AsyncURL/useHttp';
import Overlay from './Overlay';
import { addAdmins } from './adminSlice';
import Pagination from "../Pagination/Pagination"
import AdminTable from "../table/adminTable/AdminTable"
import { UniversalURL } from '../AsyncURL/BaseUrl';
import "./xodimlar.css"
import DropdownSort from '../dropdownForSelectSort/DropdownSort';
import { sortByAdmin } from '../dropdownForSelectSort/SortText';
import LoadingPage from '../loading/Loading';

export default function Xodimlar() {


  const dispatch = useDispatch();
  const { request } = useHttp();
  const [showAdminQowiw, setshowAdminQowiw] = useState(false)
  const [totalPage, setTotalPage] = useState("")
  const [sortText, setSortText] = useState("")
  const [status, setStatus] = useState("")
  const [query] = useQueryParams();
  const { page } = query;

  const showBasket = () => {
    setshowAdminQowiw(!showAdminQowiw)
  }

//======================================  GET ALL XODIMLAR  ==============================================

  const getAllXodimlar = (currentPage) => {
    request(`${UniversalURL}admin/find/all?page=${currentPage -1}&size=8&sort=${sortText}`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        dispatch(addAdmins(response.data.content));
        setTotalPage(response.data.totalPages)
        setStatus(response.ok)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAllXodimlar(page);
  }, [page, sortText]);


  return (
    <div className='wrapper-xodimlar'>
      {showAdminQowiw ? <Overlay /> : null}
      <div className="table-header">
        <h2 className='table-header-heading'>Boshqaruvchilar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showBasket}>
            Admin qo'shish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
        <DropdownSort setSortText={setSortText} sortBy={sortByAdmin} />
      </div>
    {status ?   <AdminTable/> : <LoadingPage/>}
      <Pagination  totalPages={totalPage}/>
      {showAdminQowiw
        ? <AdminqowiwForm
            showBasket={showBasket}
            getAllXodimlar={getAllXodimlar}
          />
        : null
      }
    </div>
  )
}
