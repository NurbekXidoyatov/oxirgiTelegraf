import { BarChart } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import { useHttp } from "../AsyncURL/useHttp";
import BarchsrtInfo from "../Xodimlar/BarChartInfo"


export default function ProfileManagers() {

  const { request } = useHttp();
  const [countDepertment, setCountDepartment] = useState([]);
  const [countOrg, setCountOrg] = useState([]);
  const [countOEmp, setCountEmp] = useState([]);


//   useEffect(() => {
// // count of department
//     request(
//       `${UniversalURL}department/find/all`,
//       "GET",
//       null,
//       {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-type": "application/json",
//       }
//     )
//       .then((response) => {
//         setCountDepartment(response?.data?.numberOfElements)})
//       .catch((error) => console.log(error));
// // count of organization
//       request(`${UniversalURL}organization/find/all`, "GET", null, {
//         "Authorization" : `Bearer ${localStorage.getItem("token")}`,
//         "Content-type":"application/json"
//       })
//       .then(response => {  
//         setCountOrg(response?.data?.numberOfElements)
//       }).catch(error => console.og(error))

// // count of employees
//       request(`${UniversalURL}employee/find/all`, "GET", null, {
//         "Authorization" : `Bearer ${localStorage.getItem("token")}`,
//         "Content-type":"application/json"
//       })
//       .then(response => {  
//         //setCountEmp(response?.data?.numberOfElements)
//         console.log(response);
//       }).catch(error => console.og(error))



//   }, [request]);


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
      <BarchsrtInfo/>
    </>
  );
}
