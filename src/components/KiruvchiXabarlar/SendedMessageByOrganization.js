import React, { useEffect, useState } from "react";
import { useHttp } from "../AsyncURL/useHttp";
import Pagination from "../Pagination/Pagination";
import { useQueryParams } from "react-router-query-hooks";
import "./kiruvchiXabarlar.css";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import SendedmessageTableByOrgToManager from "../table/adminTable/SendedmessageTableByOrgToManager";
import DropdownSort from "../dropdownForSelectSort/DropdownSort";
import { sortByMessageAcceptedFromOrg } from "../dropdownForSelectSort/SortText";
import LoadingPage from "../loading/Loading";
import ModalForAcceptMessageFromTelegraph from "../modalSingleInfo/ModalForAcceptMessageFromTelegraph";

export default function SendedMessageByOrganization() {
  const { request } = useHttp();
  const [showAcceptbtn, setshowAcceptbtn] = useState(true);
  const [allAcceptedMessagesFromOrg, setallAcceptedMessagesFromOrg] = useState(
    []
  );
  const [lengOfAllMessages, setlengOfAllMessages] = useState("");
  const [sortText, setSortText] = useState("");
  const [status, setStatus] = useState("");
  const [showSeparateMessage, setShowSeparateMessage] = useState(false);
  const [singleId, setsingleId] = useState("");
  const [value, setValue] = useState(true);
  const [query] = useQueryParams();
  const { page } = query;

  const showSeparateMessageModal = (id) => {
    setShowSeparateMessage(!showSeparateMessage);
    setsingleId(id);
  };

  //==============================================GET ALL MESSAGES============================================
  const getAllMessages = (currentPage) => {
    request(
      `${UniversalURL}org/message/find/all/accepted?page=${
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
        setlengOfAllMessages(response.data.totalPages);
        setallAcceptedMessagesFromOrg(response.data.content);
        setStatus(response.ok);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setshowAcceptbtn(showAcceptbtn);
    getAllMessages(page);
    setValue(value)
  }, [page, showAcceptbtn, sortText, value]);

  const chooseAccept = (id) => {
    request(`${UniversalURL}org/message/accept/${id}`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        setshowAcceptbtn(!showAcceptbtn);
      })
      .catch((error) => console.log(error));
  };

  const chooseCancel = (id) => {
    request(`${UniversalURL}org/message/cancel/${id}`, "GET", null, {
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
        <ModalForAcceptMessageFromTelegraph
          singleId={singleId}
          setShowSeparateMessage={setShowSeparateMessage}
          showSeparateMessage={showSeparateMessage}
          chooseCancel={chooseCancel}
          chooseAccept={chooseAccept}
          showAcceptbtn={showAcceptbtn}
          setshowAcceptbtn={setshowAcceptbtn}
        />
      ) : null}
      <div className="input-selection mb-4">
        <DropdownSort
          setSortText={setSortText}
          sortBy={sortByMessageAcceptedFromOrg}
        />
      </div>
      {status ? (
        <SendedmessageTableByOrgToManager
          showSeparateMessageModal={showSeparateMessageModal}
          allAcceptedMessagesFromOrg={allAcceptedMessagesFromOrg}
        />
      ) : (
        <LoadingPage />
      )}
      <div className="refresh_btn_wrapper">
        <Pagination  totalPages={lengOfAllMessages} />
        <button onClick={() => setValue(!value)} className="refresh_btn">
          Refresh
        </button>
      </div>
    </div>
  );
}
