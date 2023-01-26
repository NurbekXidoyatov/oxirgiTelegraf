import React,{ useState, useEffect} from 'react'
import { useDispatch } from "react-redux"
import { useHttp } from '../AsyncURL/useHttp';
import Overlay from '../Xodimlar/Overlay'
import { addManager } from './managerSlice';
import "../Xodimlar/xodimlar.css"
import ManagerQoshish from './ManagerQoshish';
import Pagination from '../Pagination/Pagination';
import { useQueryParams } from "react-router-query-hooks";
import { UniversalURL } from '../AsyncURL/BaseUrl';
import ManagerTable from '../table/adminTable/ManagerTable';
import ButtonBlue from '../buttons/ButtonBlue';
import { sortByManager } from '../dropdownForSelectSort/SortText';
import DropdownSort from '../dropdownForSelectSort/DropdownSort';
import LoadingPage from '../loading/Loading';


export default function Managers() {

  const {request} = useHttp();
  const dispatch = useDispatch();
  const [query] = useQueryParams();
  const { page } = query;
  const [showManagerQowiw, setshowManagerQowiw] = useState(false)
  const [totalPage, setTotalPage] = useState("")
  const [sortText, setSortText] = useState("")
  const [status, setStatus] = useState("")

  const showBasket=()=>{
    setshowManagerQowiw(!showManagerQowiw)
  }

  //================================== GET ALL MANAGERS ==========================================================
  const getAllManagers = (currentPage) => {
    request(`${UniversalURL}manager/list?page=${currentPage-1}&size=8&sort=${sortText}`, "GET", null, {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`,
      "Content-type":"application/json"
    })
    .then(response => {
      dispatch(addManager(response.data.content));
      setTotalPage(response.data.totalPages)
      setStatus(response.ok)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllManagers(page)
  }, [page, sortText]);


  return (
    <div className='wrapper-xodimlar'>
      {showManagerQowiw ? <Overlay/> : null}
      <div className="table-header">
        <h2 className='table-header-heading'>Moderatorlar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showBasket}>
            Moderator qo'shish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
       <DropdownSort setSortText={setSortText} sortBy={sortByManager}/>
      </div>
      {status ?   <ManagerTable getAllManagers={getAllManagers} page={page} /> : <LoadingPage/>}
      <Pagination totalPages={totalPage} page={page}/>
      {showManagerQowiw ? <ManagerQoshish showBasket={showBasket} getAllManagers={getAllManagers} /> : null }
    </div>
  )
}
