import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubpromoterModal from '../common/SubpromoterModal';
import DeleteModal from '../common/DeleteModal';
import Input from '../common/Input';
import SubpromoterDetailsModal from '../common/SubpromoterDetailsModal';


export default function PromoterSingularEvents() {
  const params = useParams()
    const [eventData, setEventData] = useState()
    const [show, setShow] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [orderData, setOrderData] = useState()
    const [subDetails, setSubDetails] = useState()
    const [deleteShow, setDeleteShow] = useState(false)
    const [subID, setSubID] = useState()
    useEffect(() => {
      const fetchEventData = async () => {
        try {
            const encodedEventName = encodeURIComponent(params?.event_name);
              const { data } = await axios.get(`https://nightlife-2710.herokuapp.com/promoter-orders?event_name=${encodedEventName}&promoter_access_token=${sessionStorage?.promoter_token}`)
              const { Event_Information, Order_Details } = data;
              setEventData(Event_Information);
              setOrderData(Order_Details);
            } catch (error) {
              console.log(error);
          }
      };
      fetchEventData();
  }, [params.event_name]);

  const subPromo = () => axios.get(`https://nightlife-2710.herokuapp.com/get-all-subpromoter?event_id=${eventData?.id}`)
  .then((response)=>{
    setSubDetails(response?.data)
  })
  .catch((error)=>{
    console.log(error)
  })
  
  useEffect(() => {
    if (eventData) {
      subPromo();
    }
  // eslint-disable-next-line
  }, [eventData]);
  

  const genre = eventData?.genre?.split(", ")

  const paidOrders = orderData?.filter((order) => order.status === "Entered");
  const ticketsBought = paidOrders;
  const unpaidTick = orderData?.filter((order) => order.status === "Unpaid");


const totalPaidPrice = paidOrders?.reduce(
(total, order) => total + parseFloat(order.total_price),
0
);
const totalTicks = ticketsBought?.reduce(
(total, order) => total + parseFloat(order.quantity),
0
);
const upaidQty = unpaidTick?.reduce(
(total, order) => total + parseFloat(order.quantity),
0
);

const commisionPrice = totalPaidPrice * 0.02

  return (
    <>
 <div>
    <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
      <a className="navbar-brand ms-lg-4 ms-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
      </nav>
    <div className='pt-4 w-100'>
      <div className='d-md-flex flex-md-column flex-lg-row my-5 px-md-5 px-0'>
        <div className='d-md-flex col-lg-8 p-0'>
        <div className="p-3 ms-md-5 me-md-4 mx-auto" style={{maxWidth: "100%", border: "2px solid black", minWidth: "fit-content", display: "flex", borderRadius: "10px", width: "fit-content", height: "fit-content"}}>  
          <img style={{height:"auto", maxHeight: "200px", maxWidth: "100%", borderRadius: "10px"}} src={eventData?.images_url} alt=""/>
        </div>
        <div className=' px-4 mt-md-0 mt-4 w-100'>
          <b className=''> <i className="bi bi-calendar4 me-3"></i>{eventData?.timings} • {eventData?.date}</b>
          <h3 className='primary-header mt-3'>{eventData?.event_name}</h3>
          <p className='mt-3'><i className="bi bi-geo-alt me-1"></i> {eventData?.event_venue}</p>
          <p className="mt-2"><i className="bi bi-person-circle me-2"></i>{eventData?.curated_by}</p>
          {genre?.map((identity, index)=>{
              return (<p className="d-inline-flex p-2 me-2" key={index} style={{borderRadius: "20px", fontSize: "12px", background: "#e8ebee"}}>{identity}</p>)
          })}
        </div>
      </div>
     <div className='w-100 d-flex flex-lg-column flex-md-row flex-column mt-md-5 mt-lg-0 p-3'>
      <div className='w-100 d-flex me-3'>
        <div className='col col-lg d-flex flex-column mb-3 me-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{totalPaidPrice}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Total Revenue</p></div>
        <div className='col col-lg d-flex flex-column mb-3 me-lg-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{totalTicks}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Entered</p></div>
      </div>
      <div className='w-100 d-flex'>
        <div className='col col-lg d-flex flex-column mb-3 me-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{commisionPrice}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Commission</p></div>
        <div className='col col-lg d-flex flex-column mb-3 me-lg-3 p-4' style={{color: "white", background: "black", borderRadius: "10px"}}><h3 className='mt-auto'>{upaidQty}</h3><p className='mb-0' style={{fontSize: "14px", fontWeight: "400"}}>Unpaid Tickets</p></div>
      </div>
      <Link className='text-center' style={{color: "crimson", textDecoration: "none"}} to="all-orders">View All Orders <i class="fa-solid fa-arrow-right"></i></Link>
    </div>
      </div>
      <div className='px-md-5 px-3'>
        <div className='d-flex justify-content-center w-100'>
        <h3 className="d-flex d-md-block primary-header px-md-5 mb-4" style={{color: "crimson"}}>Sub-Promoters<i className="fa-solid fa-square-plus mx-3" onClick={()=>{setShow(true)}} style={{fontSize: "27px"}}></i></h3>
        </div>
        <div className='px-lg-5 d-flex flex-wrap'>
        {subDetails?.map((identity, index)=>{
          return(
            <div className='col-md-6 col-lg-4 col p-2'>
            <div className=' overflow-hidden p-2 col-12' key={index} style={{border: "2px solid black", borderRadius: "10px", boxShadow: "8px 8px #E8EBEE"}} onClick={()=>{setShowDetailsModal(true); setSubID(()=>identity?.id)}}>
              <div className='d-flex align-items-center justify-content-between'> 
              <p className='mb-0 text-truncate'>Name: {identity?.sub_promoter_name}</p>
              <i className="fa-solid fa-trash-can" style={{color: "#d90808"}} onClick={()=>{setDeleteShow(true); setSubID(()=>identity?.id)}}></i>
            </div>
            <p className='mb-0 text-truncate'>Email: {identity?.email_id}</p>
            <p className='mb-0'>Contact: {identity?.contact}</p>
            <div className=''><Input value={identity?.sub_promoter_link} iconRight="fa-solid fa-copy" id={index}></Input></div>
            </div>
            </div>
          )
        })}
        <DeleteModal show={deleteShow} handleClose={()=>{setDeleteShow(false)}} subID={subID} />
        <SubpromoterDetailsModal show={showDetailsModal} handleClose={()=>{setShowDetailsModal(false)}} subID={subID}/>
        </div>
      </div>
    </div>
    <SubpromoterModal show={show} handleClose={()=>{setShow(false)}} eventID={eventData?.id}/>
    </div>
    </>
  )
}
