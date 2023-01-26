import React, { useState } from "react";
import "./guruhlar.css";
import { useParams } from "react-router-dom";
import { useHttp } from "../AsyncURL/useHttp";
import { useHistory } from "react-router-dom";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import ButtonBlue from "../buttons/ButtonBlue";
import Overlay from "../Xodimlar/Overlay";
import { Input, Grid } from "@nextui-org/react";

export default function EditKorxonalar() {
  const [name, setName] = useState("");
  const { goBack } = useHistory();
  const { request } = useHttp();
  var { id } = useParams();
  console.log(id)

  const handleEditedKorxona = () => {
    const updatedKorxona = { name };
    request(
      `${UniversalURL}organization/update/${id}`,
      "PUT",
      JSON.stringify(updatedKorxona),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setName("");
  };

  return (
    <>
      <Overlay />
      <div className="wrapper-guruh-qowiw-form">
        <h2 className="text-center">Tahrirlash</h2>
        <div className="input-group">
          <div className="form-right">
            <Grid.Container gap={3} Display="flex" justify="center">
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Korxonaning yangi nomini kiriting"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid.Container>
            <div className="korxona_btn">
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
                  showBasket={handleEditedKorxona}
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
