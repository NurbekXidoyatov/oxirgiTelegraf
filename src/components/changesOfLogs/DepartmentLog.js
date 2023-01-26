import React,{useState, useEffect} from 'react'
import DepartmentLogTable from '../table/adminTable/DepartmentLogTable';
import { useQueryParams } from "react-router-query-hooks";
import Pagination from '../Pagination/Pagination';
import { useHttp } from '../AsyncURL/useHttp';
import { UniversalURL } from '../AsyncURL/BaseUrl';
import LoadingPage from '../loading/Loading';

export default function DepartmentLog() {

  const [query] = useQueryParams();
  const { page } = query;
  const {request} = useHttp()
  const [departmentLog, setDepartmentLog] = useState([])
  const [totalPage, setTotalPage] = useState("")
  const [status, setStatus] = useState("")

  const getAllChanges = (currentPage) => {
    request(`${UniversalURL}log/department/find/all?page=${currentPage -1}&size=8&sort=`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
          setDepartmentLog(response?.data?.content)
          setTotalPage(response?.data?.totalPages)
          setStatus(response.ok)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllChanges(page);
  }, [page]);

  return (
    <div >
      <div >
        <h2 className='table-header-heading'>MTU - lardagi o'zgarishlar</h2>
       { status ? <DepartmentLogTable departmentLog={departmentLog}/> : <LoadingPage/>}
      </div>
      <Pagination totalPages={totalPage}/>
    </div>
  )
}
