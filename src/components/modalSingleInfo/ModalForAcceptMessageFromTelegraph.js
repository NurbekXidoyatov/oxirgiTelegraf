import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useHttp } from "../AsyncURL/useHttp";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import { Avatar, Grid, Textarea } from "@nextui-org/react";
import ZoomedImageModal from "./ZoomedImageModal";
import LoadingPage from "../loading/Loading";
import "./modal.css";

export default function ModalForAcceptMessageFromTelegraph({
    setshowAcceptbtn,
    showAcceptbtn,
    chooseAccept,
    chooseCancel,
    showSeparateMessage,
    setShowSeparateMessage,
    singleId,
}) {



  const { request } = useHttp();
  const history = useHistory()
  const [message, setMessage] = useState({});
  const [status, setStatus] = useState("");
  const [showZoomedImgModal, setShowZoomedImgModal] = useState(false);

  useEffect(() => {
    request(`${UniversalURL}org/message/view/${singleId}`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
         setMessage(response?.data)
         setStatus(response?.ok)
         setshowAcceptbtn(showAcceptbtn);
      })
      .catch((error) => console.log(error));
  }, [request, singleId]);

  if(status){
    return (
      <div>
        {showZoomedImgModal ? (
          <ZoomedImageModal
            getImgUrl={message?.hashId}
            setShowZoomedImgModal={setShowZoomedImgModal}
            showZoomedImgModal={showZoomedImgModal}
          />
        ) : null}
        <motion.div
          className="modal_backdrop"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
        />
        <motion.div
          className="modal_content_wrapper"
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
        >
          <button
            onClick={() => setShowSeparateMessage(!showSeparateMessage)}
            className="close"
          ></button>
          <motion.div
            className="modal_content"
            initial={{
              x: 100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.3,
              },
            }}
          >
            <h2>{message.title}</h2>
            <Textarea initialValue={message.context}  rows={10}/>
            <div className="file_action">
              {message?.fileType === "jpg" || message?.fileType === "JPG"  || message?.fileType === "PNG" || message?.fileType === "png"
                ? 
                <Grid onClick={() => setShowZoomedImgModal(!showZoomedImgModal)}>
                <Avatar
                  css={{ cursor: "pointer" }}
                  size="lg"
                  src={`${UniversalURL}file/file-priview/${message?.hashId}`}
                  zoomed />
              </Grid> 
              :
              null
              }
              {message?.hashId !== null ? (
                <a href={`${UniversalURL}file/download/${message?.hashId}`}>
                  <strong>Download File</strong>
                </a>
              ) : (
                <p style={{ color: "blue" }}>
                  <strong>File Biriktirilmagan</strong>
                </p>
              )}
            </div>
            <motion.div class="modal-footer">
            {message?.messageStatus === "SENDING" ||
              message?.messageStatus === "READING" ? (
                <button class="action bg_color_btn_cancell" onClick={() => chooseCancel(singleId)}>
                  Rad etish
                </button>
              ) : null}
  
              {message?.messageStatus === "SENDING" ||
              message?.messageStatus === "READING" ? (
                <button class="action bg_color_btn_accept" onClick={() => chooseAccept(singleId)}>
                  Qabul qilish
                </button>
              ) : null}
  
              {message?.messageStatus === "ACCEPTED" ? (
                <button class="action bg_color_goBack" onClick={() => history.push(`/forwardMessage/${message.id}`)}>
                  Xodimlarga jo'natish
                </button>
              ) : null}
              {message?.messageStatus === "ACCEPTED" ? (
                <button class="action bg_color_goBack"
                  onClick={() =>
                    history.push(`/forwardMessageManagers/${message.id}`)
                  }
                >
                  Telegraflarga jo'natish
                </button>
              ) : null}
  
              {message?.messageStatus === "CANCELED" ? (
                <button class="action bg_color_btn_cancell" onClick={() => console.log(singleId)}>Rad etildi</button>
              ) : null}
          </motion.div>
  
          </motion.div>       
        </motion.div>
      </div>
    );
  } else{
    return(
      <LoadingPage/>
    )
  }

  
}