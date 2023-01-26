import React, { useEffect, useState } from 'react'
import Overlay from "../Xodimlar/Overlay"
import { useHttp } from '../AsyncURL/useHttp';
import Pagination from '../Pagination/Pagination';
import SendSmsToOrganization from './SendSmsToOrganization';
import { useQueryParams } from "react-router-query-hooks";
import {UniversalURL} from "../AsyncURL/BaseUrl"
import SendedMessageTableToOrgByManager from '../table/adminTable/SendedMessageTableToOrgByManager';
import ButtonBlue from '../buttons/ButtonBlue';
import DropdownSort from '../dropdownForSelectSort/DropdownSort';
import { sortByMessageSendedToOrg } from '../dropdownForSelectSort/SortText';
import LoadingPage from '../loading/Loading';
import ModalForAcceptMessageByTelegraph from "../modalSingleInfo/ModalForAcceptMessageByTelegraph"


export default function SendedMessageToOrganization() {

  const [showAdminQowiw, setshowAdminQowiw] = useState(false)
  const [allSendedMessageToOrg, setallSendedMessageToOrg] = useState([]);
  const [lengthOfAllMessages, setlengthOfAllMessages] = useState("");
  const [sortText, setSortText] = useState("")
  const [status, setStatus] = useState("")
  const [showSeparateMessage, setShowSeparateMessage] = useState(false);
  const [singleId, setsingleId] = useState("");
  const {request} = useHttp()
  const [query] = useQueryParams();
  const { page } = query;
  const showBasket = () => {
    setshowAdminQowiw(!showAdminQowiw)
  }

  const showSeparateMessageModal = (id) => {
    setShowSeparateMessage(!showSeparateMessage);
    setsingleId(id);
  };

//============================================  getAllMessages ===============================================
  const getAllMessages = (currentPage) => {
    request(`${UniversalURL}org/message/find/all/sent?page=${currentPage-1}&size=8&sort=${sortText}`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        setallSendedMessageToOrg(response?.data?.content)
        setlengthOfAllMessages(response?.data?.totalPages)
        setStatus(response.ok)
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAllMessages(page)
  }, [page, sortText]);


  return (
    <div className='wrapper-xodimlar'>
      {showAdminQowiw ? <Overlay /> : null}
      {showSeparateMessage ? (
        <ModalForAcceptMessageByTelegraph
          singleId={singleId}
          setShowSeparateMessage={setShowSeparateMessage}
          showSeparateMessage={showSeparateMessage}
        />
      ) : null}
      <div className="table-header">
        <h2 className='table-header-heading'>Manager Yuborgan Xabarlar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showBasket}>
            Xabar yuborish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
      <DropdownSort setSortText={setSortText} sortBy={sortByMessageSendedToOrg} />
      </div>
      { status ? <SendedMessageTableToOrgByManager allSendedMessageToOrg={allSendedMessageToOrg} showSeparateMessageModal={showSeparateMessageModal}/> : <LoadingPage/>}
      <Pagination totalPages={lengthOfAllMessages} />
      {showAdminQowiw
        ? <SendSmsToOrganization
          showBasket={showBasket}
        />
        : null
      }
    </div>
  )
}