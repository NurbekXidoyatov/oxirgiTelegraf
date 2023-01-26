import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../AsyncURL/useHttp";
import Select from "react-select";
import ButtonBlue from "../buttons/ButtonBlue";
import { Input, Grid } from "@nextui-org/react";
import { UniversalURL } from "../AsyncURL/BaseUrl";

export default function ManagerGuruhQoshish({showBasket,getAllManagerGroup,emloyeesName,page}){
  const { employees } = useSelector(state => state.employees)

  let options = employees?.map((item) => ({
    label: item.fullName,
    value: item.id,
  }));

  const [selected, setSelected] = useState([]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const { request } = useHttp();
  const [name, setname] = useState("");

  const onSubmitHandler = () => {

    const selectedUsers = selected.map((user) => user.value);

    const group = {
      name: name,
      users: selectedUsers,
    }

    request(`${UniversalURL}group/save`, "POST", JSON.stringify(group), {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
    })
      .then((response) => {
        getAllManagerGroup(page);
      })
      .catch((error) => console.log(error));
      showBasket()
  };

  return (
    <>
      <div className="wrapper-admin-qowiw-form">
        <h2 className="text-center">Guruh Qo'shish</h2>
            <Grid.Container gap={3} Display="flex" justify="center">
              <Grid>
                <Input
                  bordered
                  labelPlaceholder="Guruh Nomi"
                  color="primary"
                  clearable
                  underlined
                  width="480px"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Grid>
            </Grid.Container>
            <div style={{width:"480px", zIndex:"10000"}}>
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
            <div className="admin-qowiw-btn mt-3">
              <div className="mx-5">
                <ButtonBlue shadow color="error" auto showBasket={showBasket}>
                  Bekor qilish
                </ButtonBlue>
              </div>
              <div className="mx-5">
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
