import React,{useState, useEffect} from 'react'
import OrganizationLogTable from '../table/adminTable/OrganizationLogTable';
import { useQueryParams } from "react-router-query-hooks";
import Pagination from '../Pagination/Pagination';
import { useHttp } from '../AsyncURL/useHttp';
import { UniversalURL } from '../AsyncURL/BaseUrl';
import LoadingPage from '../loading/Loading';

export default function OrganizationLog() {

  const [query] = useQueryParams();
  const { page } = query;
  const {request} = useHttp()
  const [organizationLog, setOrganizationLog] = useState([])
  const [totalPage, setTotalPage] = useState("")
  const [status, setStatus] = useState("")

  const getAllChanges = (currentPage) => {
    request(`${UniversalURL}log/organization/find/all?page=${currentPage -1}&size=8&sort=`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        setOrganizationLog(response?.data?.content)
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
        <h2 className='table-header-heading'>Korxonalardagi o'zgarishlar</h2>
       { status ? <OrganizationLogTable organizationLog={organizationLog}/> : <LoadingPage/> }
      </div>
      <Pagination totalPages={totalPage}/>
    </div>
  )
}
