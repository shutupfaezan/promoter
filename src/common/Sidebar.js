import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Sidebar.css"

export default function Sidebar() {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-lg-3">
      <div className='my-4 ps-3 ps-lg-0'>
      <h1 className='primary-header' style={{color: "transparent", WebkitTextStroke: "1px black"}}>Promoter</h1>
      <h1 className='primary-header'>Portal</h1>
    </div>
      <div className='d-flex d-lg-block w-100 overflow-auto'>
        <div className="nav nav-pills flex-column col-12 col-md-6 col-lg-12 p-0">
          <div className='p-2 p-md-3 p-lg-0'>
          <small className='nav-linkmt-0 ps-1 pb-0 mt-lg-3' style={{color: "black", fontSize: "14px"}}>Events</small>
          <div className='d-flex d-lg-block w-100'>
          <Link to="/host-an-event" className="nav-link my-2 mb-md-3 me-2 p-3 d-flex flex-column d-lg-block col col-lg-11 me-md-3" style={{color: window.location.pathname === "/host-an-event" ? "white": "black", border: "2px solid black", borderRadius: "10px", background : window.location.pathname === "/host-an-event" ? "black" : "white", boxShadow:  window.location.pathname === "/host-an-event" ? "5px 5px #E04949": null}} aria-current="page">
          <i className="bi bi-collection-play me-2"></i>Host With Us
          </Link>
          <Link to="/promoter-events" className="nav-link my-2 mb-md-3 me-2 p-3 d-flex flex-column d-lg-block col col-lg-11"style={{color: window.location.pathname === "/promoter-events" ? "white": "black", border: "2px solid black", borderRadius: "10px", background : window.location.pathname === "/promoter-events" ? "black" : "white", boxShadow:  window.location.pathname === "/promoter-events" ? "5px 5px #E04949": null}}>
            <i className="bi bi-columns-gap me-2"></i><span>All Events</span>
          </Link>
          </div>
          </div>
        </div>
      <div className="nav nav-pills flex-column col-12 col-md-6 col-lg-12 p-0">
        <div className='p-2 p-md-3 p-lg-0'>
        <small className='nav-linkmt-0 ps-1 pb-0 mt-lg-3' style={{color: "black", fontSize: "14px"}}>Account</small>
        <div className='d-flex d-lg-block w-100'>
        <Link to="/contact-us" className="nav-link my-2 mb-md-3 p-3 me-2 d-flex flex-column d-lg-block col col-lg-11 me-md-3" aria-current="page" style={{color: "black", border: "2px solid black", borderRadius: "10px"}}>
        <i className="bi bi-question-circle me-2"></i>Help
        </Link>
          <Link to="/" onClick={()=>{sessionStorage.clear()}} className="nav-link my-2 mb-md-3 me-2 p-3 d-flex flex-column d-lg-block col col-lg-11" style={{color: "black", border: "2px solid black", borderRadius: "10px"}}>
          <i className="bi bi-box-arrow-left me-2" style={{fontWeight: "800"}}></i>Sign Out
          </Link>
          </div>
      </div>
      </div>
      <div className="nav nav-pills flex-column col-12 col-md-6 col-lg-12 p-0">
        <div className='p-2 p-md-3 p-lg-0'>
        <small className='nav-linkmt-0 ps-1 pb-0 mt-lg-3' style={{color: "black", fontSize: "14px"}}>Utility</small>
        <div className='d-flex d-lg-block w-100'>
        <Link to="/qr-scanner" className="nav-link my-2 mb-md-3 p-3 me-2 d-flex flex-column d-lg-block col-6 col-lg-11 me-md-3" aria-current="page" style={{color: window.location.pathname === "/qr-scanner" ? "white": "black", border: "2px solid black", borderRadius: "10px", background : window.location.pathname === "/qr-scanner" ? "black" : "white", boxShadow:window.location.pathname === "/qr-scanner" ? "5px 5px #E04949": null}}>
        <i className="fa-solid fa-qrcode mb-2 me-2"></i>QR Scanner
        </Link>
          </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}
