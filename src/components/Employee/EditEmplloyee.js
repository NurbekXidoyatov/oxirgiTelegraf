import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Xodimlar/xodimlar.css";
import { useHttp } from "../AsyncURL/useHttp";
import { editedEmployees } from "./employeeSlice";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import Overlay from "../Xodimlar/Overlay";
import { Input, Grid } from "@nextui-org/react";
import ButtonBlue from "../buttons/ButtonBlue";

export default function EditEmployee() {
  const { goBack } = useHistory();
  const { request } = useHttp();
  var { id } = useParams();
  const dispatch = useDispatch();
  const { singleEmployee } = useSelector((state) => state.employees);
  console.log(singleEmployee);

  const [full_name, setfull_name] = useState("");
  const [job_name, setjob_name] = useState("");
  const [username, setusername] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (singleEmployee) {
      setfull_name(singleEmployee.fullName);
      setjob_name(singleEmployee.jobName);
      setusername(singleEmployee.username);
      setphone_number(singleEmployee.phoneNumber);
    }
  }, [singleEmployee]);

  useEffect(() => {
    const onhandler = async () => {
      const data = await fetch(`${UniversalURL}employee/find/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const response = await data.json();
      console.log(response);
      dispatch(editedEmployees(response.data));
    };
    onhandler();
    //eslint-disable-next-line
  }, [id]);

  const handleEditedEmployee = () => {
    const updatedEmployee = {
      full_name,
      job_name,
      username,
      phone_number,
      password,
    };
    request(
      `${UniversalURL}employee/update/${id}`,
      "PUT",
      JSON.stringify(updatedEmployee),
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
                  onChange={(e) => setfull_name(e.target.value)}
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
                  onChange={(e) => setjob_name(e.target.value)}
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
                  onChange={(e) => setusername(e.target.value)}
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
              <div className="mx-5">
                <ButtonBlue shadow color="error" auto showBasket={goBack}>
                  Bekor qilish
                </ButtonBlue>
              </div>
              <div className="mx-5">
                <ButtonBlue
                  shadow
                  color="success"
                  auto
                  showBasket={handleEditedEmployee}
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
