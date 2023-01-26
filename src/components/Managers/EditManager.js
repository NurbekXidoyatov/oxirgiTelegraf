import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Grid } from "@nextui-org/react";
import { useHttp } from "../AsyncURL/useHttp";
import { editedManager } from "./managerSlice";
import Overlay from "../Xodimlar/Overlay";
import ButtonBlue from "../buttons/ButtonBlue";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import "../Xodimlar/xodimlar.css"

export default function EditManager({getId, setShowEditModal, showEditModal, getAllManagers, page}) {


  const { request } = useHttp();
  const dispatch = useDispatch();
  const { singleManager } = useSelector((state) => state.managers);
  console.log(singleManager);

  const [full_name, setfull_name] = useState("");
  const [job_name, setjob_name] = useState("");
  const [username, setusername] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");



  useEffect(() => {
    if (singleManager) {
      setfull_name(singleManager?.fullName);
      setjob_name(singleManager?.jobName);
      setusername(singleManager?.username);
      setphone_number(singleManager?.phoneNumber);
    }
  }, [singleManager]);

  useEffect(() => {
    const onhandler = async () => {
      const data = await fetch(`${UniversalURL}manager/find/${getId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const response = await data.json();
      dispatch(editedManager(response.data));
    };
    onhandler();
    //eslint-disable-next-line
  }, [getId]);

  const handleEditedAdmin = () => {
    const updatedAdmin = {
      full_name,
      job_name,
      username,
      phone_number,
      password,
    };
    request(
      `${UniversalURL}admin/update/${getId}`,
      "PUT",
      JSON.stringify(updatedAdmin),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        getAllManagers(page)
      })
      .catch((error) => console.log(error));
      setShowEditModal(!showEditModal)
  };

  return (
    <>
      <Overlay />
      <div className="wrapper-admin-qowiw-form">
        <h2 className="text-center ">Tahrirlash</h2>
        <div className="input-group">
            <Grid.Container gap={3} Display="flex" justify="center">
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="F.I.SH."
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={full_name}
                  onChange={(e)=>setfull_name(e.target.value)}
                />
              </Grid>
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Lavozimi"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={job_name}
                  onChange={(e)=>setjob_name(e.target.value)}
                />
              </Grid>
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Username"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={username}
                  onChange={(e)=>setusername(e.target.value)}
                />
              </Grid>
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Telefon raqami"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={phone_number}
                  onChange={(e) => setphone_number(e.target.value)}
                />
              </Grid>
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Parol"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
            </Grid.Container>
            <div className="admin-qowiw-btn">
              <div>
                <ButtonBlue shadow color="error" auto showBasket={() => setShowEditModal(!showEditModal)}>
                  Bekor qilish
                </ButtonBlue>
              </div>
              <div>
                <ButtonBlue
                  shadow
                  color="success"
                  auto
                  showBasket={handleEditedAdmin}
                >
                  Saqlash
                </ButtonBlue>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
