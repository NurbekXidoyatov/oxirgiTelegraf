import React, { useState } from 'react'
import { useHttp } from '../AsyncURL/useHttp';
import useHashId from '../../hooks/useHashId';
import LoadingPage from '../loading/Loading';
import { UniversalURL } from '../AsyncURL/BaseUrl';


export default function SendingMessageToManager() {

  const { request } = useHttp()
  const upload = useHashId();
  const [xabarMatni, setxabarMatni] = useState("");
  const [xabarSarlavhasi, setxabarSarlavhasi] = useState("")
  const [xabarFayli, setxabarFayli] = useState("");
  const [status, setStatus] = useState(true);
  


const onSubmitHandlerXabarYuborish = async ()=>{

  const hashId = await upload(xabarFayli);

  const body = {
      hashId,
      title : xabarSarlavhasi,
      context : xabarMatni,
    }

  request(`${UniversalURL}emp/org/message/send`, "POST", JSON.stringify(body),
  {
    "Authorization" : `Bearer ${localStorage.getItem("token")}`,
    "Content-type":"application/json"
  }).then(response => {
    setStatus(response.ok)
    console.log(response);
  })
    .catch(error => console.log(error));

    setxabarMatni("");
    setxabarSarlavhasi("");
    setxabarFayli("")
}


return (
  <div>
    {status ? null : <LoadingPage/>}
    <div className='wrpper_sending_message'>
      <div className="mb-3">
        <label for="exampleFormControlInputtitle" className="form-label">Xabar Sarlavhasi</label>
        <input value={xabarSarlavhasi} onChange={e => setxabarSarlavhasi(e.target.value)} type="text" className="form-control" id="exampleFormControlInputtitle" placeholder="Text title" />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Xabar</label>
        <textarea value={xabarMatni} onChange={e => setxabarMatni(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label for="formFile" className="form-label">Fayl biriktirish</label>
        <input onChange={e => setxabarFayli(e.target.files[0])} className="form-control" type="file" id="formFile" />
        <button onClick={onSubmitHandlerXabarYuborish} className='btn btn-success form-control my-3'>Xabarni Yuborish</button>
      </div>
    </div>
  </div>
)
}
