import axios from 'axios';
import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function OrderTicketModal(props) {
  
  function changeStatus() {
    axios.put(`https://nightlife-2710.herokuapp.com/update-order-status?order_id=${props?.displayOrders?.Order_ID}`)
      .then((response) => {
        props.handleClose();
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const isPaid = props?.displayOrders?.status?.[0] === 'Paid';
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split("-");
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  }
  

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='w-100 p-2 '>
          <div className='d-flex'>
          <b style={{fontWeight: "800", fontSize: "15px"}} > Order Id: {props?.displayOrders?.Order_ID}</b>
            <span className="ms-auto" style={{marginRight: "5px", fontWeight: "100"}}>Status:</span>
            <span style={{color: isPaid ? "#49cc90" : "#b10808"}}>
              {props?.displayOrders?.status?.[0]}
            </span>
          </div>
          <hr className='mt-0' style={{background: "black"}}></hr>
          <span className='col p-2'>Event Info: </span> 
          <div className='col p-2 w-100'>
                <div className='p-md-3 p-3 w-100 d-flex' style={{border: "1.5px solid black", borderRadius: "10px", boxShadow: "5px 5px rgb(205 207 209)"}}>
                    <img className="col-3 p-0" style={{height: "80px", borderRadius: "7px"}} alt="" src={props?.displayOrders?.Event?.Image}/>
                    <div className='overflow-auto col px-2'>
                        <div  className='text-truncate overflow-hidden'><b>{props?.displayOrders?.Event?.Event_Name}</b></div>
                        <div className='d-flex overflow-auto align-items-center'><div className="overflow-hidden text-truncate" style={{fontSize: "0.7rem", fontWeight: "400"}}>{props?.displayOrders?.Event?.Event_Venue}</div></div>
                        <div className='d-flex'><div style={{fontSize: "0.7rem", fontWeight: "400"}}>{props?.displayOrders?.Event?.Event_Timings} • {formatDate(props?.displayOrders?.Event?.Event_Date)}</div></div>
                    </div>
                </div>
              </div>
          <span className='d-flex flex-column mb-4 mt-3'>
            {props?.displayOrders?.Ticket_Category && props?.displayOrders?.Quantity && props?.displayOrders?.Description && props?.displayOrders?.Cover_Description && props?.displayOrders?.Price && props?.displayOrders?.Ticket_Category.map((ticket, index) => (
              <div className='w-100 px-2' key={index}>
                <div className='d-flex mt-2'>
                  <div className='col-6'>
                    <p className='m-0'>{ticket}</p>
                    <p className='m-0' style={{color: "gray", fontSize: "14px"}}>
                      {props?.displayOrders?.Description[index]} | {props?.displayOrders?.Cover_Description[index]}
                    </p>
                  </div>
                  <div className='ms-auto col-6 d-flex flex-column text-end'>
                    <p className='m-0'>₹{props?.displayOrders?.Price[index]}</p>
                    <p style={{fontSize: "13px", color: "gray"}}>Oty: {props?.displayOrders?.Quantity[index]}</p>
                  </div>
                </div>  
              </div>
            ))}
          </span>
            <small className='col p-0 px-2' style={{color: "crimson"}}>*Collect the amount before changing the status to entered</small>
           {props?.displayOrders?.status?.[0] === "Unpaid" && <div className='d-flex justify-content-end mt-2'>
            <button className="btn-success me-1 bg-success text-white px-2 py-2" onClick={changeStatus} style={{fontSize: "15px", borderRadius: "10px", border: "none"}}>Entered</button>
            <i className="fa-solid fa-xmark me-1 bg-danger text-white px-2 py-2" onClick={()=>{props.handleClose();}} style={{fontSize: "24px", borderRadius: "10px"}}></i>
          </div>}
        </div>
      </div>
    </Modal>
  );
}
