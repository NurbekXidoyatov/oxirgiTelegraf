import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Xodimlar/xodimlar.css";
import { useHttp } from "../AsyncURL/useHttp";
import { UniversalURL } from "../AsyncURL/BaseUrl";
import Overlay from "../Xodimlar/Overlay";
import { Input, Grid } from "@nextui-org/react";
import ButtonBlue from "../buttons/ButtonBlue";
import Select from "react-select";

export default function EditManagerGuruh() {
  const { goBack } = useHistory();
  const { request } = useHttp();
  var { id } = useParams();
  const [name, setName] = useState("");
  const [separateGroup, setSeparateGroup] = useState([]);
 
//=============================================================================== 

  useEffect(() => {
    const onhandler = async () => {
      const data = await fetch(`${UniversalURL}group/view/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const response = await data.json();
      setSeparateGroup(response.data)
    };
    onhandler();
    //eslint-disable-next-line
  }, [id]);

  let oldValue = separateGroup?.users?.map((item) => ({
    label: item?.fullName,
    value: item?.id,
  }));

  useEffect(() => {
    if (separateGroup) {
      setName(separateGroup.name);
    }
    if(oldValue){
      setSelected(oldValue);
    }
  }, [separateGroup]);

  console.log(separateGroup.users);
 
//=======================================================================================
const { length } = useSelector(state => state.employees)
let options = length?.map((item) => ({
  label: item?.fullName,
  value: item?.id,
}));

const [selected, setSelected] = useState([]);

const onChange = (selectedOptions) => {
  setSelected(selectedOptions);
};

  const handleEditedEmployee = () => {

    const selectedUsers = selected?.map((user) => user?.value);
    const updatedEmployee = {
      id,
      name,
      users:selectedUsers
    };
    request(
      `${UniversalURL}group/edit`,
      "POST",
      JSON.stringify(updatedEmployee),
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      }
    )
      .then((response) => {

      })
      .catch((error) => console.log(error));
      goBack()
  };

  return (
    <>
      <Overlay />
      <div className="wrapper-admin-qowiw-form">
        <h2 className="text-center ">Tahrirlash</h2>
            <Grid.Container gap={3} Display="flex" justify="center">
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Guruh nomi"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid> 
            </Grid.Container>
            <div style={{width:"480px", zIndex:"10000", marginBottom:"20px"}}>
            <p className="my-2">Ishchilarni tanlang</p>
              <Select
                useDragHandle
                axis="xy"
                distance={4}
                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                isMulti
                options={options}
                value={selected}
                onChange={onChange}
                closeMenuOnSelect={false}
              />
            </div>
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
    </>
  );
}
