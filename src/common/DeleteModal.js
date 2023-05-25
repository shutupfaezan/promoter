import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function DeleteModal(props) {
  const [isLoading, setIsLoading] = useState(false)

    function DeleteSubPromoter(){
        setIsLoading(true)
        axios.delete(`https://nightlife-2710.herokuapp.com/delete-sub-promoters?sub_promoter_id=${props.subID}&promoter_access_token=${sessionStorage?.promoter_token}`)
        .then(()=>{
            window.location.reload()
            props.handleClose()
            setIsLoading(false)
        })
        .catch((error)=>{
            console.log(error)
            setIsLoading(false)
        })
    }
  return (
    <>
    <Modal show={props.show} onHide={props.handleClose} subID={props.subID} centered>
        <div className='mx-auto my-auto py-5 px-4'>
            <p className='d-flex flex-nowrap'>Are you sure you want to delete this sub-promoter? This Change is irreversible.</p>
        <button className='mx-auto d-flex btn btn-danger rounded-pill' onClick={DeleteSubPromoter}>
        {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              {!isLoading && <span id="login-text-span">Delete</span>}
        </button>
        </div>
    </Modal>
    </>
  )
}
