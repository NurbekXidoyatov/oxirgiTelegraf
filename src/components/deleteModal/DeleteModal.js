import React from 'react'
import "./deleteModal.css"
import Overlay from '../Xodimlar/Overlay'
import { useHistory, useParams } from 'react-router-dom'

export default function DeleteModal({getId, deleteAdminHandler, setShowDeleteModal, showDeleteModal}) {

    const {goBack} = useHistory()
    const {id} = useParams()
  return (
    <div>
        <Overlay/>
        <div className='delete_modal_warpper'>
            <h2 className='delete_modal_title'>Are you sure?</h2>
            <div className='delete_modal_buttons_wrapper'>
                <button onClick={() => setShowDeleteModal(!showDeleteModal)}  className='delete_modal_button_no' >Yo'q</button>
                <button onClick={() => deleteAdminHandler(getId)}  className='delete_modal_button_yes' >Ha</button>
            </div>
        </div>
    </div>
  )
}
