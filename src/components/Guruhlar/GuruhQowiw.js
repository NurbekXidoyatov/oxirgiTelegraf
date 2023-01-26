import React, { useState, useEffect } from "react";
import "./guruhlar.css";
import { useHttp } from "../AsyncURL/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { getDeepartmentId } from "./organizationSlice";
import { Input, Grid } from "@nextui-org/react";
import ButtonBlue from "../buttons/ButtonBlue";
import { UniversalURL } from "../AsyncURL/BaseUrl";

export default function GuruhQowiw({ showguruhqowiwlist, getAllOrganization, page }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const { request } = useHttp();
  const [phone_number, setphone_number] = useState("");
  const { departments } = useSelector((state) => state.organizations);

  useEffect(() => {
    request(`${UniversalURL}department/find/all`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        dispatch(getDeepartmentId(response.data.content));
      })
      .catch((error) => console.log(error));

  }, []);

  const onSubmitHandler = () => {

    const organization = { name, phone_number, id };

    if (!name) {
      alert("Korxona nomini kiritmadingiz!!");
      setName("");
    }

    request(
      `${UniversalURL}organization/save`,
      "POST",
      JSON.stringify(organization),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        getAllOrganization(page)
      })
      .catch((error) => console.log(error));
      showguruhqowiwlist()
  };

  return (
    <>
      <div className="wrapper-guruh-qowiw-form">
        <h2 className="text-center">Korxona yaratish</h2>
              <Grid.Container gap={3} Display="flex" justify="center">
                <Grid>
                  <Input
                    bordered
                    labelPlaceholder="Korxona nomi"
                    color="primary"
                    clearable
                    underlined
                    width="480px"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <Input
                    bordered
                    labelPlaceholder="Korxona raqami"
                    color="primary"
                    clearable
                    underlined
                    width="480px"
                    value={phone_number}
                    onChange={(e) => setphone_number(e.target.value)}
                  />
                </Grid>
              </Grid.Container>
              <div style={{width:"480px"}}>
                <select
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  class="form-select-lg form-control  my-3"
                >
                  <option selected>Uzelni tanlang</option>
                  {departments.length
                    ? departments.map((department) => {
                        return (
                          <option value={department.id}>{department.name}</option>
                        );
                      })
                    : null}
                </select>
              </div>

            <div className="korxona_btn">
              <div>
                <ButtonBlue shadow color="error" auto showBasket={showguruhqowiwlist}>
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
    </>
  );
}
