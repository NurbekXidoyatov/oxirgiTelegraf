import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Grid } from "@nextui-org/react";
import "./xodimlar.css";
import { useHttp } from "../AsyncURL/useHttp";
import { editedAdmin } from "./adminSlice";
import Overlay from "./Overlay";
import ButtonBlue from "../buttons/ButtonBlue";
import { UniversalURL } from "../AsyncURL/BaseUrl";

export default function EditAdmin() {
  const { request } = useHttp();
  var { id } = useParams();
  const dispatch = useDispatch();
  const { goBack } = useHistory();
  const showBasket = goBack;
  const { singleAdmin } = useSelector((state) => state.admins);
  console.log(singleAdmin);

  const [full_name, setfull_name] = useState("");
  const [job_name, setjob_name] = useState("");
  const [username, setusername] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (singleAdmin) {
      setfull_name(singleAdmin.fullName);
      setjob_name(singleAdmin.jobName);
      setusername(singleAdmin.username);
      setphone_number(singleAdmin.phoneNumber);
    }
  }, [singleAdmin]);

  useEffect(() => {
    const onhandler = async () => {
      const data = await fetch(`${UniversalURL}admin/find/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const response = await data.json();
      dispatch(editedAdmin(response.data));
    };
    onhandler();
    //eslint-disable-next-line
  }, [id]);

  const handleEditedAdmin = () => {
    const updatedAdmin = {
      full_name,
      job_name,
      username,
      phone_number,
      password,
    };
    request(
      `${UniversalURL}admin/update/${id}`,
      "PUT",
      JSON.stringify(updatedAdmin),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Overlay />
      <div className="wrapper-admin-qowiw-form">
        <h2 className="text-center ">Tahrirlash</h2>
        <div className="input-group">
          <div className="form-left">
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
                <ButtonBlue shadow color="error" auto showBasket={showBasket}>
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
      </div>
    </>
  );
}
