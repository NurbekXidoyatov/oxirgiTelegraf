import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../AsyncURL/useHttp";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import Overlay from "../Xodimlar/Overlay";
import ButtonBlue from "../buttons/ButtonBlue";
import { Input, Grid } from "@nextui-org/react";
import "./department.css";

export default function EditDepartment() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const { request } = useHttp();
  const [name, setname] = useState("");

  const onSubmitDepartment = () => {
    const editedDepartmentName = { name };

    request(
      `${UniversalURL}department/update/${id}`,
      "PUT",
      JSON.stringify(editedDepartmentName),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setname("");
  };

  return (
    <div>
      <Overlay />
      <div className="wrapper-guruh-qowiw-form">
        <h2>Tahrirlash</h2>
        <Grid.Container gap={3} Display="flex" justify="center">
          <Grid>
            <Input
              bordered
              labelPlaceholder="MTU - ning yangi nomini kiriting"
              color="primary"
              clearable
              underlined
              width="480px"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Grid>
        </Grid.Container>
        <div className="edit_department_btn">
          <div>
            <ButtonBlue shadow color="error" auto showBasket={goBack}>
              Bekor qilish
            </ButtonBlue>
          </div>
          <div>
            <ButtonBlue
              shadow
              color="success"
              auto
              showBasket={onSubmitDepartment}
            >
              Saqlash
            </ButtonBlue>
          </div>
        </div>
      </div>
    </div>
  );
}
