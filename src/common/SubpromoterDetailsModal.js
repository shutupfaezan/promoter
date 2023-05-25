import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export default function SubpromoterDetailsModal(props) {
  const [subPromoterDetails, setSubPromoterDetails] = useState();
  const [subPromoterAnalytics, setSubPromoterAnalytics] = useState();

  const sub_promoter_details = () => {
    if (props.show) {
      axios
        .get(`https://nightlife-2710.herokuapp.com/sub-promoter-modal?sub_promoter_id=${props.subID}`)
        .then((response) => {
          setSubPromoterDetails(response?.data?.sub_promoter_details);
          setSubPromoterAnalytics(response?.data?.sub_promoter_analytics);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    sub_promoter_details();
    // eslint-disable-next-line
  }, [props.show]);

  return (
    <Modal show={props.show} onHide={props.handleClose} subID={props.subID} centered>
      <div className='px-md-5 pt-5 pb-4 p-4'>
        <div className="p-3 px-4 shadow" style={{borderRadius: "10px"}}>
        <p className='mb-0'>Name: {subPromoterDetails?.sub_promoter_name}</p>
        <p className='mb-0'>Email Id: {subPromoterDetails?.email_id}</p>
        <p className='mb-0'>Contact: {subPromoterDetails?.contact}</p>
        <p className='mb-0'>Status: {subPromoterDetails?.status}</p>
        </div>
      </div>
      <div  className='px-md-5 px-3 pb-md-5 pb-4 d-flex flex-wrap'>
        <div className='col-6 p-1'>
        <div className="p-3" style={{background: "black", color: "white", borderRadius: "10px"}}>
          <p className='mb-0' style={{fontSize: "25px"}}>{subPromoterAnalytics?.total_tickets_sold}</p>
          <p className='mb-0'>Total Sold</p>
        </div>
        </div>
        <div className='col-6 p-1'>
        <div className="p-3" style={{background: "black", color: "white", borderRadius: "10px"}}>
          <p className='mb-0' style={{fontSize: "25px"}}>{subPromoterAnalytics?.number_of_entered_tickets}</p>
          <p className='mb-0'>Entered</p>
        </div>
        </div>
        <div className='col-6 p-1'>
        <div className="p-3" style={{background: "black", color: "white", borderRadius: "10px"}}>
          <p className='mb-0' style={{fontSize: "25px"}}>{subPromoterAnalytics?.total_revenue}</p>
          <p className='mb-0'>Total Revenue</p>
        </div>
        </div>
        <div className='col-6 p-1'>
        <div className="p-3" style={{background: "black", color: "white", borderRadius: "10px"}}>
          <p className='mb-0' style={{fontSize: "25px"}}>{subPromoterAnalytics?.total_amount_collected}</p>
          <p className='mb-0'>Collected</p>
        </div>
        </div>
      </div>
    </Modal>
  )
}
