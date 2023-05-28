import React from 'react'
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';

export default function Stepper() {
    const { eventStepper } = useContext(SingularContext);
  return (
    <div className='d-flex mb-4 mt-0 mt-md-4 ps-md-2 pe-lg-5 pe-md-2'>
        <div  className='col px-1'>
        <div className='w-100' style={{height: "3px", background:  eventStepper > 1 ? "black" : eventStepper === 1 ? "crimson": "#C1C9D2", borderRadius: "10px"}}>
        </div>
        <div className='d-flex align-items-center mt-1'>
        <small style={{color: eventStepper > 1 ? "black" : eventStepper === 1 ? "crimson": "#C1C9D2"}}>Event Info</small>
        </div>
        </div>
        <div  className='col px-1' >
        <div className='w-100' style={{height: "3px", background: eventStepper > 2 ? "black" : eventStepper === 2 ? "crimson": "#C1C9D2", borderRadius: "10px"}}>
        </div>
        <div className='d-flex align-items-center mt-1'>
        <small style={{color: eventStepper > 2 ? "black" : eventStepper === 2 ? "crimson": "#C1C9D2"}}>Ticket Info</small>
        </div>
        </div>
        <div  className='col px-1' >
        <div className='w-100' style={{height: "3px", background: eventStepper > 3 ? "black" : eventStepper === 3 ? "crimson": "#C1C9D2", borderRadius: "10px"}}>
        </div>
        <div className='d-flex align-items-center mt-1'>
        <small style={{color: eventStepper > 3 ? "black" : eventStepper === 3 ? "crimson": "#C1C9D2"}}>Table Info</small>
        </div>
        </div>
        <div  className='col px-1' >
        <div className='w-100' style={{height: "3px", background: eventStepper > 4 ? "black" : eventStepper === 4 ? "crimson": "#C1C9D2", borderRadius: "10px"}}>
        </div>
        <div className='d-flex align-items-center mt-1'>
        <small style={{color: eventStepper > 4 ? "black" : eventStepper === 4 ? "crimson": "#C1C9D2"}}>Review Info</small>
        </div>
        </div>
      </div>
  )
}
