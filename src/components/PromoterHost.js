import React from 'react';
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import PromoterSidebar from '../common/Sidebar';
import Stepper from '../common/Stepper';
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';
import PromoterEventInfo from './PromoterEventInfo';
import PromoterTicketing from './PromoterTicketing';
import PromoterTables from './PromoterTables';
import PromoterReview from './PromoterReview';
import Navbar from '../common/Navbar';


export default function PromoterHost() {
  const { eventStepper } = useContext(SingularContext);
  return(
    <>
    <div>
      <Navbar/>
  <div className='d-lg-flex px-lg-5 p-3' style={{height: "100%"}}>
        <div className='col-lg-3 p-0'>
          <PromoterSidebar/>
        </div>
    <div className='px-0 col-lg-9 mt-0 mt-md-4 '>
      <BrowserView className='d-flex justify-content-center'>
        <h3 className='primary-header' style={{color: "crimson"}}>Making Hosting Events Faster</h3>
      </BrowserView>
      <TabletView className='d-flex justify-content-center'>
      <h3 className='primary-header' style={{color: "crimson"}}>Making Hosting Events Faster</h3>
      </TabletView>
      <MobileOnlyView className='d-flex justify-content-center text-center'>
      <h5 className='primary-header mb-4' style={{color: "crimson"}}>Making Hosting Events Faster</h5>
      </MobileOnlyView>
      <Stepper></Stepper>
      {eventStepper === 1 && <PromoterEventInfo/>}
      {eventStepper === 2 && <PromoterTicketing/>}
      {eventStepper === 3 && <PromoterTables/>}
      {eventStepper === 4 && <PromoterReview/>}

    </div>
    </div>
    </div>
    </>
  )
}
