import { BarChart } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import { useHttp } from "../AsyncURL/useHttp";
import PieRechartComponent from "./PieChart"
import BarChartInfo from "./BarChartInfo";
export default function BoshSahifa() {

  const { request } = useHttp();
  const [statistics, setStatistics] = useState({});


  useEffect(() => {
// count of department
    request(
      `${UniversalURL}statistic`,
      "GET",
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        setStatistics(response?.data)
      })
      .catch((error) => console.log(error));
  }, [request]);

  console.log(statistics);


  return (
    <>
      <div className="statistics_window_wrapper">
        <h2 className="statistics_title">Telegraflar bo'yicha umumiy ma'lumotlar</h2>
        <div className="statistics_windows">

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #BCD5F1"}}>
            <i class="fa-solid fa-building-columns" style={{color:"#103996", display:"block"}}></i>
            </div>
            <h3 className="count_department">{statistics?.countOfDepartment}</h3>
            <h5 className="name_department">MTUlar soni</h5>
          </div>

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #B4DBF5"}}>
              <i class="fa-solid fa-building" style={{color:"#0C53B7", display:"block"}}></i>
            </div>
            <h3 className="count_department">{statistics?.countOfOrg}</h3>
            <h5 className="name_department">Telegraflar soni</h5>
          </div>

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #F6E8B3"}}>
            <i class="fa-solid fa-people-group" style={{color:"#B78103", display:"block"}}></i>
            </div>
            <h3 className="count_department">{statistics?.countOfEmployee}</h3>
            <h5 className="name_department">Xodimlar soni</h5>
          </div>

          <div className="statistics_window">
            <div className="window_img" style={{backgroundColor:" #F9D7CC"}}>
            <i class="fa-solid fa-envelope" style={{color:"#B72136", display:"block"}}></i>
            </div>
            <h3 className="count_department">{statistics?.sendedMessageToUser + statistics?.sendedMessageToOrg +statistics?.sendedMessageToManager + statistics?.acceptedMessageFromUser + statistics?.acceptedMessageFromOrg + statistics?.acceptedMessageFromManager}</h3>
            <h5 className="name_department">Xabarlar soni</h5>
          </div>
        </div>
      </div>
      <BarChartInfo statistics={statistics}/>
    </>
  );
}
