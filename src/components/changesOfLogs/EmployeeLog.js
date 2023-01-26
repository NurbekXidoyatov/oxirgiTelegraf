import React,{useState, useEffect} from 'react'
import EmployeeLogTable from '../table/adminTable/EmployeeLogTable';
import { useQueryParams } from "react-router-query-hooks";
import Pagination from '../Pagination/Pagination';
import { useHttp } from '../AsyncURL/useHttp';
import { UniversalURL } from '../AsyncURL/BaseUrl';
import LoadingPage from '../loading/Loading';

export default function EmployeeLog() {

  const [query] = useQueryParams();
  const { page } = query;
  const {request} = useHttp()
  const [employeeLog, setEmployeeLog] = useState([])
  const [totalPage, setTotalPage] = useState("")
  const [status, setStatus] = useState("")

  const getAllChanges = (currentPage) => {
    request(`${UniversalURL}log/employee/find/all?page=${currentPage -1}&size=8&sort=`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        setEmployeeLog(response?.data?.content)
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
        <h2 className='table-header-heading'> Ishchilardagi o'zgarishlar</h2>
      { status ? <EmployeeLogTable employeeLog={employeeLog}/> : <LoadingPage/>}
      </div>
      <Pagination totalPages={totalPage}/>
    </div>
  )
}
