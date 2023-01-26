import React, { useState, useEffect } from "react";
import "../XabarYuborish/XabarYuborish.css";
import Select from "react-select";
import { useHttp } from "../AsyncURL/useHttp";
import useHashId from "../../hooks/useHashId";
import ButtonBlue from "../buttons/ButtonBlue";
import { UniversalURL } from "../AsyncURL/BaseUrl";

export default function ForvardToEmployeesFromEmployees({ showForvardModal,setShowForvardModal, separateMsg}) {

  const { request } = useHttp();
  const upload = useHashId();
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [xabarMatni, setxabarMatni] = useState(separateMsg?.context);
  const [xabarSarlavhasi, setxabarSarlavhasi] = useState(separateMsg?.title);
  const [xabarFayli, setxabarFayli] = useState("");
  const [employees, setEmployees] = useState([]);
  const [groups, setGroups] = useState([]);

  const selectedGroupID = selectedGroup.map((group) => group.value); // group id for posting to server
  const selectedEmployeeID = selectedEmployee.map((employee) => employee.value); // employee id for posting to server

  const onChangeGroup = (e) => {
    setSelectedGroup(e);
  };

  const onChangeEmployee = (e) => {
    setSelectedEmployee(e);
  };

  let optionsGroup = groups.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  let optionsEmployee = employees.map((item) => ({
    label: item.fullName,
    value: item.id,
  }));

  useEffect(() => {
    request(
      `${UniversalURL}employee/find/all`,
      "GET",
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
        setEmployees(response.data.content)
      })
      .catch((error) => console.log(error));
  }, [request]);

  useEffect(() => {
    request(`${UniversalURL}group/find/all`,'GET',null,
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      }
    )
      .then(response => {
        setGroups(response.data.content)
        console.log(response);
      })
      .catch(error => console.log(error))
  }, [request])

//=====================================================Submit the message==================================================
  const onSubmitHandlerXabarYuborish = async () => {
    const hashId = await upload(xabarFayli);

    const body = {
      hashId,
      title: xabarSarlavhasi,
      context: xabarMatni,
      userId: selectedEmployeeID,
      groupId: selectedGroupID,
    };

    request(
      `${UniversalURL}message/send`,
      "POST",
      JSON.stringify(body),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {
      })
      .catch((error) => console.log(error));
    setxabarMatni("");
    setxabarSarlavhasi("");
    setxabarFayli("");
    setSelectedGroup([]);
    setSelectedEmployee([]);
  };

  return (
    <div>
      <div className="wrapper-xabarlar">
        <div className="search-xabarlar">
          <div className="xabar_yuborish_select_wrapper">
            <label className="my-1" for="floatingSelect1">
              Guruhlarni Tanlash
            </label>
            <Select
              className="xabar_yuborish_select"
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
          <div className="xabar_yuborish_select_wrapper">
            <label className="my-1" for="floatingSelect">
              Foydalanuvchilarni Tanlash
            </label>
            <Select
              className="xabar_yuborish_select"
              useDragHandle
              axis="xy"
              distance={4}
              getHelperDimensions={({ node }) => node.getBoundingClientRect()}
              isMulti
              options={optionsEmployee}
              value={selectedEmployee}
              onChange={onChangeEmployee}
              closeMenuOnSelect={false}
            />
          </div>
        </div>
        <div className="mb-1">
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
            <ButtonBlue shadow color="error" auto showBasket={() => setShowForvardModal(!showForvardModal)}>
              Bekor qilish
            </ButtonBlue>
          </div>
          <div>
            <ButtonBlue shadow color="success" auto showBasket={onSubmitHandlerXabarYuborish}>
              Yuborish
            </ButtonBlue>
          </div>
        </div>
      </div>
    </div>
  );
}
