import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManagerGuruhQoshish from './ManagerGuruhQoshish'
import { useHttp } from '../AsyncURL/useHttp'
import Overlay from '../Xodimlar/Overlay'
import { addGroups } from './managerGuruhSlice'
import { useQueryParams } from 'react-router-query-hooks'
import Pagination from '../Pagination/Pagination'
import {UniversalURL} from "../AsyncURL/BaseUrl"
import ManagerGroupTable from "../table/adminTable/ManagerGroupTable"
import ButtonBlue from '../buttons/ButtonBlue'
import '../Xodimlar/xodimlar.css'
import DropdownSort from '../dropdownForSelectSort/DropdownSort'
import { sortByManagerGroup } from '../dropdownForSelectSort/SortText'
import LoadingPage from "../loading/Loading"

export default function ManagerGuruh() {

  const dispatch = useDispatch()
  const { request } = useHttp()
  const { lengthGroup } = useSelector(state => state.groups)
  const [showGuruhQowiw, setshowGuruhQowiw] = useState(false)
  const [sortText, setSortText] = useState("")
  const [status, setStatus] = useState("")
  const [query] = useQueryParams()
  const { page } = query

  const showBasket = () => {
    setshowGuruhQowiw(!showGuruhQowiw)
  }
//===============================GET ALL MANAGER GROUP ==================================================
  const getAllManagerGroup = currentPage => {
    request(`${UniversalURL}group/find/all?page=${currentPage - 1}&size=8&sort=${sortText}`,'GET',null,
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      }
    )
      .then(response => {
        dispatch(addGroups(response.data.content))
        setStatus(response.ok)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getAllManagerGroup(page)
  }, [page, sortText])

  return (
    <div className="wrapper-xodimlar">
      {showGuruhQowiw ? <Overlay /> : null}
      <div className="table-header">
        <h2 className="table-header-heading">Guruhlar</h2>
        <div>
          <ButtonBlue shadow color="primary" auto showBasket={showBasket}>
            Guruh yaratish
          </ButtonBlue>
        </div>
      </div>
      <div className="input-selection mb-4">
      <DropdownSort setSortText={setSortText} sortBy={sortByManagerGroup} />
      </div>
      {status ?   <ManagerGroupTable/> : <LoadingPage/>}
      <Pagination totalPages={Math.ceil(lengthGroup.length / 8)} />
      {showGuruhQowiw ? (
        <ManagerGuruhQoshish
          showBasket={showBasket}
          getAllManagerGroup={getAllManagerGroup}
          page={page}
        />
      ) : null}
    </div>
  )
}
