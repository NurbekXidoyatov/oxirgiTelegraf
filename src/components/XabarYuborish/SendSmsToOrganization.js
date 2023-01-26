import React, { useState, useEffect } from "react";
import "./XabarYuborish.css";
import Select from "react-select";
import { useHttp } from "../AsyncURL/useHttp";
import useHashId from "../../hooks/useHashId";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import ButtonBlue from "../buttons/ButtonBlue";

export default function SendSmsToOrganization({ showBasket }) {
  const { request } = useHttp();
  const upload = useHashId();
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [xabarMatni, setxabarMatni] = useState("");
  const [xabarSarlavhasi, setxabarSarlavhasi] = useState("");
  const [xabarFayli, setxabarFayli] = useState("");
  const [allOrganization, setallOrganization] = useState([]);

  const selectedOrgId = selectedGroup.map((group) => group.value); // org id for posting to server

  const onChangeGroup = (e) => {
    setSelectedGroup(e);
  };

  let optionsGroup = allOrganization.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  useEffect(() => {
    request(`${UniversalURL}org/message/list`, "GET", null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        setallOrganization(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmitHandlerXabarYuborish = async () => {
    const hashId = await upload(xabarFayli);

    const body = {
      hashId,
      title: xabarSarlavhasi,
      context: xabarMatni,
      orgId: selectedOrgId,
    };

    request(`${UniversalURL}org/message/send`, "POST", JSON.stringify(body), {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    setxabarMatni("");
    setxabarSarlavhasi("");
    setxabarFayli("");
    setSelectedGroup([]);
  };

  return (
    <div className="wrapper-xabarlar">
      <div className="xabar_yuborish_select_wrapper_org">
        <label className="my-3" for="floatingSelect1">
          Organizationni Tanlash
        </label>
        <Select
          className="xabar_yuborish_select "
          useDragHandle
          axis="xy"
          distance={4}
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          isMulti
          options={optionsGroup}
          value={selectedGroup}
          onChange={onChangeGroup}
          closeMenuOnSelect={false}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInputtitle" className="form-label">
          Xabar Sarlavhasi
        </label>
        <input
          value={xabarSarlavhasi}
          onChange={(e) => setxabarSarlavhasi(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInputtitle"
          placeholder="Text title"
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Xabar
        </label>
        <textarea
          value={xabarMatni}
          onChange={(e) => setxabarMatni(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label for="formFile" className="form-label">
          Fayl biriktirish
        </label>
        <input
          onChange={(e) => setxabarFayli(e.target.files[0])}
          className="form-control"
          type="file"
          id="formFile"
        />
      </div>
      <div className="btns">
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
            showBasket={onSubmitHandlerXabarYuborish}
          >
            Saqlash
          </ButtonBlue>
        </div>
      </div>
    </div>
  );
}
