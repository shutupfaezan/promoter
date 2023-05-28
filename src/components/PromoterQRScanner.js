import React, {useEffect, useState} from 'react';
import PromoterSidebar from "../common/Sidebar"
// import Footer from '../../common/Footer'
import axios from "axios"
import QrScanner from 'react-qr-scanner';

import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import OrderTicketModal from '../common/OrderTicketModal';
import Navbar from '../common/Navbar';


export default function PromoterQRScanner() {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [displayOrders, setDisplayOrders] = useState();
  const [result, setResult] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

useEffect(() => {
  if (result) {
    setIsLoading(true)
    axios.get(`https://nightlife-2710.herokuapp.com/promoter-modal-values?order_id=${result}`)
    .then(response => {
        setIsLoading(false)
        setDisplayOrders(response.data)
        console.log(response.data);
        setShow(true)
      })
      .catch(error => {
        setIsLoading(false)
        // Handle API error
        console.error(error);
      });
  }
}, [result]);

let isDesktop = (width > 768);

  const handleError = err => {
    console.error(err);
  }

  const handleScan = data => {
    if (data) {
      setResult(data.text);
    }
  }

  const handleCancel = () => {
    setResult(null);
  }

  const handleClose = () => setShow(false);

  return (
    <div>
      <Navbar/>
      <div className='d-lg-flex px-lg-5 p-3'>
        <div className='col-lg-3 p-0'>
          <PromoterSidebar/>
        </div>
        <div className='col-lg-9 p-0 d-flex flex-column align-items-center mt-5 mt-lg-0 justify-content-center align-items-center text-center' style={{height: "100%"}}>
          <BrowserView className='d-flex justify-content-center flex-column vh-100'>
            You need a mobile or a tablet device to use this utility
          </BrowserView>
          <TabletView>
          {result ? (
            <>
            {
            isLoading && <div className='d-flex justify-content-center mt-auto' style={{height: "50vh"}}>
              <div className='d-flex align-items-center'>
              <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
              </div>
              </div>
              }
              {!isLoading && <button className="btn btn-secondary px-4" style={{backgroundColor: "black", borderRadius: "10px"}} onClick={handleCancel}>Scan again</button>}
            </>
          ) : (
            <QrScanner
              onError={handleError}
              onScan={handleScan}
              style={{ width: '300px', height: '100%' }}
              constraints={
                isDesktop
                ? undefined
                : {
                    video: {
                        facingMode: { exact: `environment` }
                    }
                  }
            }
            showViewFinder={true}
            />
          )}
          </TabletView>

          <MobileOnlyView>
          {result ? (
            <>
             {isLoading && <div className='d-flex justify-content-center mt-auto mx-auto' style={{height: "50vh"}}>
          <div className='d-flex align-items-center  position-relative'>
          <span><img src={process.env.PUBLIC_URL + "/images/output-onlinegiftools.gif"} style={{height: '100px', width: "100px", transform: "translate(-50%, -50%)", position: "absolute", top: "50%", left: "50%"}} alt=""/></span>
          </div>
          </div>}
              {!isLoading && <button className="btn btn-secondary rounded-pill" style={{backgroundColor: "black", borderRadius: "10px"}}  onClick={handleCancel}>Scan again</button>}
            </>
          ) : (
            <QrScanner
              onError={handleError}
              onScan={handleScan}
              style={{ width: '300px', height: '100%' }}
              constraints={
                isDesktop
                ? undefined
                : {
                    video: {
                        facingMode: { exact: `user` }
                    }
                  }
            }
            showViewFinder={true}
            />
          )}
          </MobileOnlyView>
        </div>
      </div>
              <OrderTicketModal show={show} displayOrders={displayOrders} handleClose={handleClose}/>
      </div>
  )
}

