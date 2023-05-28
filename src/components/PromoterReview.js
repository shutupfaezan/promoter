import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import Toast from 'react-bootstrap/Toast';
import { SingularContext } from '../contexts/Context';

export default function PromoterReview() {
  const { eventInfoValue } = useContext(SingularContext);
  const [toastMessge, setToastMessage] = useState("")
  const [isLoading, setisLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const uploaded = eventInfoValue?.event_information?.images_url
  const fileBlob = new Blob([uploaded], { type: uploaded?.type })
  function submitEventRequest(){
    setisLoading(true)
    axios.post(`https://nightlife-2710.herokuapp.com/complete-promoter-hosting?promoter_access_token=${sessionStorage.promoter_token}`, eventInfoValue)
      .then(() => {
        try {
          const formData = new FormData();
          formData.append('file', eventInfoValue?.event_information?.images_url);
          axios.post(`https://nightlife-2710.herokuapp.com/event-poster?event_name=${eventInfoValue?.event_information?.event_name}`, formData);
          setisLoading(false)
          setToastMessage("Event Created Successfully")
          setShowToast(true)
          setTimeout(() => setShowToast(false), 2000);
        } catch (error) {
          setisLoading(false)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 2000);
          console.log(error);
          setToastMessage("Some Error Occured")
        }
      })
      .catch((error)=>{
        setisLoading(false)
        setShowToast(true)
        setToastMessage("Some Error Occured")
        setTimeout(() => setShowToast(false), 2000);
      })
  }
  return (
  <div className='mt-0 mt-md-4 ps-md-2 pe-lg-5 pe-md-2' style={{fontSize: "14px"}}>
    <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pe-md-3">
          <label className= "form-label mb-0" style={{fontWeight: "400"}}>Event Name</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" id="floatingInputGrid" disabled={true}  defaultValue={eventInfoValue?.event_information?.event_name}/>
      </div>
      <div className="col px-0 mt-2 col-lg-6 mt-md-0 ms-md-2 ms-0 ps-md-3">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Venue/Club Name:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true}  defaultValue={eventInfoValue?.event_information?.event_venue}/>
      </div>
      </div>  
      <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pe-md-3">
          <label className='form-label mb-0' style={{fontWeight: "400"}}>Date:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.date}/>
      </div>
      <div className="col px-0 mt-2  col-lg-6 mt-md-0 ms-md-2 ms-0 ps-md-3">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Contact:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.contact}/>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pe-md-3">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Timings:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.timings}/>
      </div>
      <div className="col px-0 mt-2  col-lg-6 mt-md-0 ms-md-2 ms-0 ps-md-3">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Curated By:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.curated_by}/>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Featuring:</label>
          <input type="text" className="form-control" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} disabled={true} defaultValue={eventInfoValue?.event_information?.featuring}/>
      </div>
      </div>
      <div className='d-md-flex mt-2'>
      <div className="col col-lg-6 px-0 pe-md-3">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Genre:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.genre}/>
      </div>
      <div className="col px-0 mt-2 col-lg-6 mt-md-0 ms-md-2 ms-0 ps-md-3">
          <label class="form-label mb-0" style={{fontWeight: "400"}}>Price:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" id="floatingInputGrid" disabled={true} defaultValue={eventInfoValue?.event_information?.price_range}/>
      </div>
      </div>
      <div className=' my-3'>
      <label className="form-label mb-0 d-block mb-2" style={{fontWeight: "400"}}>Event Poster:</label>
          {fileBlob && (
            <img className='col-md-6 colms-0 p-2' src={URL.createObjectURL(fileBlob)} alt="Oops..Looks like you forgot to upload an event poster" style={{border: "2px solid black", borderRadius: "20px"}}/>
          )}
        </div>
      <div className='d-md-flex mt-2'>
        <div className="col px-0 mt-2 mt-md-0">
          <label className='form-label mb-0' style={{fontWeight: "400"}}>Terms and Conditions:</label>
      {eventInfoValue?.event_information?.terms.map((identity, fields)=>{
        return <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control mb-2" disabled={true} defaultValue={identity}></input>
    })}
    </div>
    </div>
      <div className='d-md-flex mt-2'>
      <div className="col px-0 mt-2 mt-md-0">
          <label className="form-label mb-0" style={{fontWeight: "400"}}>Description:</label>
          <input type="text" style={{background: "#F4F5F6", border: "0px", color: "#01040D", fontWeight: "400", fontSize: "14px"}} className="form-control" disabled={true} defaultValue={eventInfoValue?.event_information?.description}/>
      </div>
      </div>
    <div className='my-4'>
        <b className='mt-4 ms-2' style={{fontSize: "16px"}}>Pricing Categories:</b>
            <table className="table table-hover mt-3">
            <thead style={{color: "white", background: "black"}}>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
                <tbody>
                  {eventInfoValue?.ticket_information?.map((identity, fields)=>{
                      return <tr key={fields}>
                        <th style={{alignItems: "center", width: "33%", fontWeight: "lighter"}} scope="row">
                        <div>{identity.ticket_category}</div>
                        <div style={{fontWeight: "400"}}>{identity.cover_description}</div>
                        <div style={{fontWeight: "400"}}>{identity.description}</div>
                        </th>
                        <td>
                          {identity.price}
                        </td>
                        <td>
                          {identity.total_quantity}
                        </td>
                        </tr>
                    })}
                </tbody>
              </table>
      </div>
    <div className='my-4'>
        <b className='mt-4 ms-2' style={{fontSize: "16px"}}>Table Categories:</b>
            <table className="table table-hover mt-3">
            <thead style={{color: "white", background: "black"}}>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
                <tbody>
                  {eventInfoValue?.table_information?.map((identity, fields)=>{
                      return <tr key={fields}>
                        <th style={{alignItems: "center", width: "33%", fontWeight: "lighter"}} scope="row">
                        <div>{identity.table_category}</div>
                        <div style={{fontWeight: "400"}}>{identity.table_benefits}</div>
                        <div style={{fontWeight: "400"}}>{identity.description}</div>
                        </th>
                        <td>
                          {identity.price}
                        </td>
                        <td>
                          {identity.total_quantity}
                        </td>
                        </tr>
                    })}
                </tbody>
              </table>
      </div>

            {toastMessge === "Event Created Successfully" && <Toast onClose={() => setShowToast(false)} className="bg-success text-center text-white" show={showToast} delay={3000} autohide style={{position: "absolute", left: "50%", transform: "translate(-50%)", top: "50px"}}>
              <Toast.Body>{toastMessge}</Toast.Body>
            </Toast>}
            {toastMessge !== "Event Created Successfully" && <Toast onClose={() => setShowToast(false)} className="bg-danger text-center text-white" show={showToast} delay={3000} autohide style={{position: "absolute", left: "50%", transform: "translate(-50%)", top: "120px"}}>
              <Toast.Body>{toastMessge}</Toast.Body>
              </Toast>}
        <div className='w-100 d-flex justify-content-center'>   
      <button type="submit" onClick={submitEventRequest} style={{background: "black"}} className="btn btn-primary mt-3 col-md-4 py-2">
      {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
            {isLoading && (<span id="login-loading-text-span">Loading</span>)}
            {!isLoading && <span id="login-text-span">Create Event Request</span>}</button>
      </div>
    </div>
  )
}
