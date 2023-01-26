import React, { useEffect, useState } from "react";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import { useHttp } from "../AsyncURL/useHttp";


export default function EmployeeProfile() {

  const { request } = useHttp();
  const [countDepertment, setCountDepartment] = useState([]);
  const [countOrg, setCountOrg] = useState([]);
  const [countOEmp, setCountEmp] = useState([]);



  return (
    <>
      <div className="statistics_window_wrapper">
        <h2 className="statistics_title">Telegraflar bo'yicha umumiy ma'lumotlar</h2>
        <div className="statistics_windows">

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #BCD5F1"}}>
            <i class="fa-solid fa-building-columns" style={{color:"#103996", display:"block"}}></i>
            </div>
            <h3 className="count_department">20</h3>
            <h5 className="name_department">MTUlar soni</h5>
          </div>

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #B4DBF5"}}>
              <i class="fa-solid fa-building" style={{color:"#0C53B7", display:"block"}}></i>
            </div>
            <h3 className="count_department">77</h3>
            <h5 className="name_department">Telegraflar soni</h5>
          </div>

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #F6E8B3"}}>
            <i class="fa-solid fa-people-group" style={{color:"#B78103", display:"block"}}></i>
            </div>
            <h3 className="count_department">1025</h3>
            <h5 className="name_department">Xodimlar soni</h5>
          </div>

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #F9D7CC"}}>
            <i class="fa-solid fa-envelope" style={{color:"#B72136", display:"block"}}></i>
            </div>
            <h3 className="count_department">2001</h3>
            <h5 className="name_department">Xabarlar soni</h5>
          </div>
        </div>
      </div>
    </>
  );
}
