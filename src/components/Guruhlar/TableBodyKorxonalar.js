import React from 'react'
import { useHistory } from 'react-router-dom'

export default function TableBodyKorxonalar({number, organization, deleteOrganizationHandler }) {

  const history = useHistory()

  return (
    <>
      <tbody>
          <tr>
            <th scope="row">{number}</th>
            <td>{organization.name}</td>
            <td>{organization.phoneNumber}</td>
            <td>
              <span onClick={() => history.push(`/editkorxona/${organization.id}`)} className='guruhlar-edit-delete-button'><i className="fa-regular fa-pen-to-square" style={{color:"#FF8C00"}}></i></span>
              <span onClick={() => deleteOrganizationHandler(organization.id)} className='guruhlar-edit-delete-button'><i className="fa-solid fa-trash" style={{color:"red"}}></i></span>
            </td>
          </tr>
        </tbody>
    </>
  )
}
