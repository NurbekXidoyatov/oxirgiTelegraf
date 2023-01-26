import React, { useState } from "react";
import { useHttp } from "../AsyncURL/useHttp";
import { Input, Grid } from "@nextui-org/react";
import ButtonBlue from "../buttons/ButtonBlue";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import "../Xodimlar/xodimlar.css";

export default function IshchiQoshish({ showBasket1, getAllEmployees, page }) {
  const { request } = useHttp();
  const [full_name, setfull_name] = useState("");
  const [job_name, setjob_name] = useState("");
  const [username, setusername] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = () => {

    const admin = { full_name, job_name, username, phone_number, password };

    request(
      `${UniversalURL}employee/save`,
      "POST",
      JSON.stringify(admin),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        getAllEmployees(page);
      })
      .catch((error) => console.log(error));
    showBasket1()
  };

  return (
    <>
      <div className="wrapper-admin-qowiw-form">
        <h2 className="text-center">Xodim yaratish</h2>
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
                  onChange={(e) => setjob_name (e.target.value)}
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
               <div>
                <ButtonBlue shadow color="error" auto showBasket={showBasket1}>
                  Bekor qilish
                </ButtonBlue>
              </div>
              <div>
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
        </div>
      </div>
    </>
  );
}
