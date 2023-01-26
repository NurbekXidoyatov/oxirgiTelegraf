import React,{useState } from 'react'
import "./department.css"
import { useHttp } from '../AsyncURL/useHttp';
import { Input, Grid } from "@nextui-org/react";
import ButtonBlue from '../buttons/ButtonBlue';
import { UniversalURL } from '../AsyncURL/BaseUrl';


export default function GuruhQowiw({showDepartmentqowiwlist, page, getAllDepartments}) {

  const [name, setName] = useState("");
  const {request}=useHttp();

  const onSubmitHandler = ()=>{

    const department={name}

    if(!name){
      alert("Korxona nomini kiritmadingiz !!!")
      return
    }

    request(`${UniversalURL}department/save`, "POST", JSON.stringify(department),
    {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      "Content-type":"application/json"
    }).then(response => {
      console.log(response.data)
      getAllDepartments(page)
    })
      .catch(error => console.log(error))
      showDepartmentqowiwlist()
  }


  return (
    <>
      <div className="wrapper-guruh-qowiw-form">
        <h2 className='text-center'>Uzel yaratish</h2>
        <div className="input-group">
          <div className="form-right">
            <Grid.Container gap={3} Display="flex" justify="center">
                <Grid>
                  <Input bordered labelPlaceholder="MTU nomi" color="primary" clearable underlined width="480px"  value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
              </Grid.Container>
            <div className='mtu_btn'>
               <div>
                <ButtonBlue shadow color="error" auto showBasket={showDepartmentqowiwlist}>
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
  )
}
