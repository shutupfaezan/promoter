import React from 'react';
import "../css/HostBarExtra.css"
import Footer from "../common/Footer"
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';
import PromoterEventInfo from '../components/PromoterComponents/PromoterEventInfo';
import PromoterPricing from '../components/PromoterComponents/PromoterPricing';
import PromoterReviewInfo from '../components/PromoterComponents/PromoterReviewInfo';
import PromoterTableInfo from '../components/PromoterComponents/PromoterTableInfo'
import PromoterSidebar from '../common/PromoterSidebar';
import Stepper from '../common/Stepper';
import { BrowserView, MobileOnlyView, TabletView } from 'react-device-detect';


export default function AutoHost() {
//   const { eventStepper } = useContext(SingularContext);
  return(
    <>
    <div>
    <nav className="navbar navbar-expand navbar-light align-items-center headerback w-100 py-2 py-md-3 px-3 px-lg-5 px-md-3" style={{backgroundColor: "black"}}>
        <a className="navbar-brand ml-lg-4 ml-2 py-3 py-md-1 text-white" style={{fontWeight: "800"}} href="/"> <h3 className="primary-header m-0">BottmzUp</h3></a>
        </nav>
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
        {/* {eventStepper === 1 && <PromoterEventInfo/>}
        {eventStepper === 2 && <PromoterPricing/>}
        {eventStepper === 3 && <PromoterTableInfo/>}
        {eventStepper === 4 && <PromoterReviewInfo/>} */}
    </div>
    </div>
    <Footer/>
    </div>
    </>
  )
}
