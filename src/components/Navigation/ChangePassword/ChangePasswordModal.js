import React, {useState} from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { Password } from "./Password";
import {UniversalURL} from "../../AsyncURL/BaseUrl"
import {useHttp} from "../../AsyncURL/useHttp"

export default function ChangePasswordModal() {

  const {request} = useHttp()

  const [visible, setVisible] = useState(false);
  const [old_password, setOld_password] = useState("")
  const [new_password, setNew_password] = useState("")
  const [confirm_password, setConfirm_password] = useState("")


  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const onSubmitHandler = () => {
    const newPassword = { old_password, new_password, confirm_password};

    request(
      `${UniversalURL}profile/change/password`,
      "POST",
      JSON.stringify(newPassword),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
       console.log(response);
      })
      .catch((error) => console.log(error));

      closeHandler()
  };


  return (
    <div>
      <Button shadow auto onClick={handler}>
        Login parolni o'zgartirish
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
           Parolni  o'zgartirish
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Input
            value={old_password}
            onChange={(e) => setOld_password(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Eski Parol"
            contentLeft={<Password fill="currentColor" />}
          />
          <Input
            value={new_password}
            onChange={(e) => setNew_password(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Yangi parol"
            contentLeft={<Password fill="currentColor" />}
          />
          <Input
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Yangi parolni takroran kiriting"
            contentLeft={<Password fill="currentColor" />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Bekor qilish
          </Button>
          <Button auto onClick={onSubmitHandler}>
            Saqlash
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
