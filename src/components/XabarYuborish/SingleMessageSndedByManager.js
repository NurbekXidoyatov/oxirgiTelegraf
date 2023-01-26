import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../AsyncURL/useHttp';
import {UniversalURL} from "../AsyncURL/BaseUrl"
import { Button, Grid } from "@nextui-org/react";
import SingleMessageTableSendedByManager from '../table/adminTable/SingleMessageTableSendedByManager';
import LoadingPage from '../loading/Loading';

export default function SingleMessageSndedByManager() {

  const { goBack } = useHistory();
  const { id } = useParams();
  const { request } = useHttp();
  const [singleMessage, setsingleMessage] = useState([])
  const [status, setStatus] = useState("")

  useEffect(() => {
    request(`${UniversalURL}message/find-by-message-id/${id}`, "GET", null, {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json"
    })
      .then(response => {
        setsingleMessage(response.data)
        setStatus(response.ok)
      })
      .catch(error => console.log(error))
  }, [id])

  return (
    <div>
      <table className="table">
        <thead>
          <th scope="col"><h3> Yuborilgan xabar to'g'risida ma'lumot </h3></th>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "40%" }}><strong>Kim tomonidan yuborilgan</strong></td>
            <td>{singleMessage?.fromUser?.fullName}</td>
          </tr>
          <tr>
            <td><strong>Yuborilgan vaqti</strong></td>
            <td>{singleMessage?.createdAt}</td>
          </tr>
          <tr>
            <td><strong>Xabar sarlavhasi</strong></td>
            <td>{singleMessage?.title}</td>
          </tr>
          <tr>
            <td><strong>Xabar matni</strong></td>
            <td>{singleMessage?.context}</td>
          </tr>
          <tr>
            <td><strong>Xabar fayli</strong></td>
            <td>{singleMessage?.hashId !== null ? <a style={{ display: "block", textDecoration: "none" }} href={`${UniversalURL}file/download/${singleMessage?.hashId}`}><strong>Faylni yuklash</strong></a> : <p style={{ color: "blue" }}><strong>File Biriktirilmagan</strong></p>}
            </td>
          </tr>
        </tbody>
      </table>

      <h4 className='text-center'>Xabar yuborilgan xodimlar</h4>
      {status ? <SingleMessageTableSendedByManager/> : <LoadingPage/>}
      <Grid.Container gap={2} display="flex" justify='center'>
      <Grid>
        <Button shadow color="gradient"  onClick={goBack} css={{width:'600px'}} >
          Orqaga qaytish
        </Button>
      </Grid>
    </Grid.Container>
    </div>
  )
}