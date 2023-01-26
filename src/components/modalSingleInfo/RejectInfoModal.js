import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useHttp } from "../AsyncURL/useHttp";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import {Textarea } from "@nextui-org/react";
import LoadingPage from "../loading/Loading";
import "./modal.css";

export default function Modal({
  chooseCancel,
  singleId,
  setShowRejectModal,
  showSeparateMessage
}) {


  const { request } = useHttp();
  const history = useHistory()
  const [showZoomedImgModal, setShowZoomedImgModal] = useState(false);


    return (
      <div>
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
          <button onClick={() => setShowRejectModal(!showSeparateMessage)} className="close"></button>
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
            <h2>Rad etish sababini yozing!!!</h2>
            <Textarea initialValue="Salom"  rows={10}/>
            <motion.div class="modal-footer">
                <button class="action bg_color_btn_cancell" onClick={() => chooseCancel(singleId)}>
                    Orqaga
                </button>
  
                <button class="action bg_color_btn_accept" onClick={() => setShowRejectModal(!showSeparateMessage)}>
                    Saqlash
                </button>
          </motion.div>
  
          </motion.div>       
        </motion.div>
      </div>
    );
}