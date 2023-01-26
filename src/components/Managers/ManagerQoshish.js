import React, { useState, useEffect } from "react";
import { useHttp } from "../AsyncURL/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { getOrgID } from "./managerSlice";
import { Input, Grid } from "@nextui-org/react";
import ButtonBlue from "../buttons/ButtonBlue";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import "../../components/Xodimlar/xodimlar.css"

export default function ManagerQoshish({ showBasket, getAllManagers, page }) {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { orginalID } = useSelector((state) => state.managers);
  const [full_name, setfull_name] = useState("");
  const [job_name, setjob_name] = useState("");
  const [username, setusername] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");
  const [org_id, setorg_id] = useState("");

  useEffect(() => {
    request(`${UniversalURL}organization/all`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        dispatch(getOrgID(response.data));
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [request, dispatch]);

  const onSubmitHandler = async () => {

    const manager = {
      full_name,
      job_name,
      username,
      phone_number,
      password,
      org_id,
    };
    const response = await fetch(`${UniversalURL}manager/save`, {
      method: "POST",
      body: JSON.stringify(manager),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    getAllManagers(page);
    showBasket()
  };

  return (
    <>
      <div className="wrapper-admin-qowiw-form">
        <h2 className="text-center">Manager Qo'shish</h2>
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
            <div className="mb-3" style={{width:"480px"}}>
              <label for="formGroupExampleInput2" className="form-label">
                Korxonani Tanlang
              </label>
              <select
                value={org_id}
                onChange={(e) => setorg_id(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                {orginalID.length
                  ? orginalID.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className="admin-qowiw-btn" >
            <div className="mx-3">
                <ButtonBlue shadow color="error" auto showBasket={showBasket}>
                  Bekor qilish
                </ButtonBlue>
              </div>
              <div className="mx-3">
                <ButtonBlue
                  shadow
                  color="success"
                  auto
                  showBasket={onSubmitHandler}
                >
                  Saqlash
                </ButtonBlue>
              </div>
            </div>
      </div>
    </>
  );
}
