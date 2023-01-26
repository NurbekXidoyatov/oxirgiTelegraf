import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IshchiQoshish from "./IshchiQoshish";
import { useHttp } from "../AsyncURL/useHttp";
import Overlay from "../Xodimlar/Overlay";
import { addEmployees } from "./employeeSlice";
import Pagination from "../Pagination/Pagination";
import { useQueryParams } from "react-router-query-hooks";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import ManagerEmployeeTable from "../table/adminTable/ManagerEmployeeTable";
import ButtonBlue from "../buttons/ButtonBlue";
import "../Xodimlar/xodimlar.css";
import DropdownSort from "../dropdownForSelectSort/DropdownSort";
import {sortByManagerEmployees} from "../dropdownForSelectSort/SortText"
import LoadingPage from  "../loading/Loading"

export default function Employee() {

  const {employees} = useSelector(state => state.employees)
  const dispatch = useDispatch();
  const { request } = useHttp();
  const [showEmployeeQowiw, setshowEmployeeQowiw] = useState(false);
  const [totalPage, setTotalPage] = useState("");

  const [query] = useQueryParams();
  const { page } = query;
  const [sortText, setSortText] = useState("")
  const showBasket1 = () => {
    setshowEmployeeQowiw(!showEmployeeQowiw);
  };

  //==================================================GET All EMPLOYEES ===========================================
  const getAllEmployees = (currentPage) => {
    request(
      `${UniversalURL}employee/find/all?page=${currentPage - 1}&size=8&sort=${sortText}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        dispatch(addEmployees(response?.data?.content));
        setTotalPage(response?.data?.totalPages)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEmployees(page);
  }, [page, sortText]);

  return (
    <div className="wrapper-xodimlar">
      {showEmployeeQowiw ? <Overlay /> : null}
      <div className="table-header">
        <h2 className="table-header-heading">Xodimlar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showBasket1}>
            Xodim yaratish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
      <DropdownSort setSortText={setSortText} sortBy={sortByManagerEmployees} />
      </div>
    {employees.length ?  <ManagerEmployeeTable /> : <LoadingPage/>}
      <Pagination totalPages={totalPage} />
      {showEmployeeQowiw ? (
        <IshchiQoshish
          showBasket1={showBasket1}
          getAllEmployees={getAllEmployees}
          page={page}
        />
      ) : null}
    </div>
  );
}
