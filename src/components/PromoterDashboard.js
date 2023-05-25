import React from 'react'
import Sidebar from '../common/Sidebar'
import Navbar from '../common/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function PromoterDashboard() {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <Navbar/>
      <div className='d-lg-flex px-lg-5 p-3'>
        <div className='col-lg-3 p-0'>
          <Sidebar/>
        </div>
        <div className='col-lg-9 p-0 d-flex flex-column align-items-center mt-5 mt-lg-0 justify-content-center align-items-center text-center'>
          <h6 className='p-0 p-3' style={{fontWeight: "700"}}>Haven't hosted an event yet? Don't worry we got you</h6>
          <Link onClick={()=>navigate('/host-an-event')} className="btn d-inline-flex align-items-center border-0 px-5 collapsed text-white justify-content-center" style={{background: "black", borderRadius: "25px" }} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              Host An Event
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}
