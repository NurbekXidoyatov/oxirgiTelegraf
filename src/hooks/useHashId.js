
import { UniversalURL } from "../components/AsyncURL/BaseUrl";
const useHashId = () => {
  const upload = async (file) => {
    let formData = new FormData();
    formData.append("file", file)
    const response = await fetch(`${UniversalURL}file/upload`, {
      method : "POST",
      body :  formData,
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        //"Content-type":"application/json"
      },
    })
    const { data } = await response.json();
    return data.hashId;
  }
  return upload;
}

export default useHashId;