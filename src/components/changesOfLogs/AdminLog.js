import React,{useState, useEffect} from 'react'
import AdminLogTable from '../table/adminTable/AdminLogTable'
import { useQueryParams } from "react-router-query-hooks";
import Pagination from '../Pagination/Pagination';
import { useHttp } from '../AsyncURL/useHttp';
import { UniversalURL } from '../AsyncURL/BaseUrl';
import LoadingPage from '../loading/Loading';

export default function AdminLog() {

  const [query] = useQueryParams();
  const { page } = query;
  const {request} = useHttp()
  const [adminLog, setAdminLog] = useState([])
  const [totalPage, setTotalPage] = useState("")
  const [status, setStatus] = useState("")

  const getAllChanges = (currentPage) => {
    request(`${UniversalURL}log/admin/find/all?page=${currentPage -1}&size=8&sort=`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
          setAdminLog(response?.data?.content)
          setTotalPage(response?.data?.totalPages)
          setStatus(response.ok)
          console.log(response)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllChanges(page);
  }, [page]);

  return (
    <div >
      <div >
        <h2 className='table-header-heading'>Adminlardagi o'zgarishlar</h2>
      { status ? <AdminLogTable adminLog={adminLog}/> : <LoadingPage/> }
      </div>
      <Pagination totalPages={totalPage}/>
    </div>
  )
}
