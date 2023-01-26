import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryParams } from "react-router-query-hooks";
import Overlay from "../Xodimlar/Overlay";
import { useHttp } from "../AsyncURL/useHttp";
import DepartmentQoshish from "./DepartmentQoshish";
import { addDepartment } from "./departmentSlice";
import Pagination from "../Pagination/Pagination";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import MtuTable from "../table/adminTable/MtuTable";
import ButtonBlue from "../buttons/ButtonBlue";
import DropdownSort from "../dropdownForSelectSort/DropdownSort";
import { sortByMtu } from "../dropdownForSelectSort/SortText";
import LoadingPage from "../loading/Loading"

export default function Department() {


  const [departmenQoshish, setdepartmenQoshish] = useState(false);
  const [totalPage, setTotalPage] = useState("");
  const [sortTextMtu, setSortTextMtu] = useState("");
  const [status, setStatus] = useState("")
  const [query] = useQueryParams();
  const { page } = query;

  const showDepartmentqowiwlist = () => {
    setdepartmenQoshish(!departmenQoshish);
  };
  const { request } = useHttp();
  const dispatch = useDispatch();

  //================================get All Departments =====================================================

  const getAllDepartments = (currentPage) => {
    request(
      `${UniversalURL}department/find/all?page=${currentPage - 1}&size=8&sort=${sortTextMtu}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        dispatch(addDepartment(response.data.content));
        setTotalPage(response.data.totalPages)
        setStatus(response.ok)
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllDepartments(page);
  }, [page, sortTextMtu]);

  //=====================================================================================

  return (
    <div className="wrapper-guruhlar">
      {departmenQoshish ? <Overlay /> : null}
      <div className="table-header">
        <h2 className="table-header-heading">Uzellar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showDepartmentqowiwlist}>
            Uzel yaratish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
        <DropdownSort setSortText={setSortTextMtu} sortBy={sortByMtu}/>
      </div>
      {status ? <MtuTable page={page} getAllDepartments={getAllDepartments} /> : <LoadingPage/>}
      <Pagination totalPages={totalPage} />
      {departmenQoshish ? (
        <DepartmentQoshish showDepartmentqowiwlist={showDepartmentqowiwlist} page={page} getAllDepartments={getAllDepartments}  />
      ) : null}
    </div>
  );
}
