import React, { useEffect, useState } from "react";
import { useQueryParams } from "react-router-query-hooks";
import { useDispatch } from "react-redux";
import { useHttp } from "../AsyncURL/useHttp";
import { allMessages } from "../XabarYuborish/managerXabarYuborishSlice";
import Pagination from "../Pagination/Pagination";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import AcceptedMessageFromEmployeesToManagerTable from "../table/adminTable/AcceptedMessageFromEmployeesToManagerTable";
import "./kiruvchiXabarlar.css";
import DropdownSort from "../dropdownForSelectSort/DropdownSort";
import { sortByMessageAcceptedFromUser } from "../dropdownForSelectSort/SortText";
import LoadingPage from "../loading/Loading";
import Modal from "../modalSingleInfo/Modal";
import RejectInfoModal from "../modalSingleInfo/RejectInfoModal";

export default function KiruvchiXabarlar() {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [query] = useQueryParams();
  const [lenthPages, setlenthPages] = useState("");
  const [showAcceptbtn, setshowAcceptbtn] = useState(true);
  const [sortText, setSortText] = useState("");
  const [status, setStatus] = useState("");
  const [showSeparateMessage, setShowSeparateMessage] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [singleId, setsingleId] = useState("");
  const [value, setValue] = useState(true);
  const { page } = query;

  const showSeparateMessageModal = (id) => {
    setShowSeparateMessage(!showSeparateMessage);
    setsingleId(id);
  };

  //=================================== GET ALL MESSAGES ============================================================
  const getAllMessages = (currentPage) => {
    request(
      `${UniversalURL}accepted/message/find/all?page=${
        currentPage - 1
      }&size=8&sort=${sortText}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        dispatch(allMessages(response.data.content));
        setlenthPages(response.data.totalPages);
        setStatus(response.ok);
        console.log("salom");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setShowSeparateMessage(showSeparateMessage);
    setshowAcceptbtn(showAcceptbtn);
    getAllMessages(page);
    setValue(value);
  }, [page, showAcceptbtn, sortText, showSeparateMessage, value]);

  //=================================== GET ALL MESSAGES ACCEPTED  ============================================================
  const chooseAccept = (id) => {
    request(`${UniversalURL}accepted/message/accept/${id}`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        setshowAcceptbtn(!showAcceptbtn);
      })
      .catch((error) => console.log(error));
  };
  //=================================== GET ALL MESSAGES CANCELLED ============================================================
  const chooseCancel = (id) => {
    request(`${UniversalURL}accepted/message/cancel/${id}`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        setshowAcceptbtn(!showAcceptbtn);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {showSeparateMessage ? (
        <Modal
          singleId={singleId}
          setShowSeparateMessage={setShowSeparateMessage}
          showSeparateMessage={showSeparateMessage}
          chooseCancel={chooseCancel}
          chooseAccept={chooseAccept}
          showAcceptbtn={showAcceptbtn}
          setshowAcceptbtn={setshowAcceptbtn}
          setShowRejectModal={setShowRejectModal}
        />
      ) : null}
      <div className="input-selection mb-4">
        <DropdownSort
          setSortText={setSortText}
          sortBy={sortByMessageAcceptedFromUser}
        />
      </div>
      {status ? (
        <AcceptedMessageFromEmployeesToManagerTable
          showSeparateMessageModal={showSeparateMessageModal}
        />
      ) : (
        <LoadingPage />
      )}
      <div className="refresh_btn_wrapper">
        <Pagination totalPages={lenthPages} />
        <button onClick={() => setValue(!value)} className="refresh_btn">
          Refresh
        </button>
      </div>
      { showRejectModal ? <RejectInfoModal setShowRejectModal={setShowRejectModal}   showSeparateMessage={showSeparateMessage}/> : null}
    </div>
  );
}
