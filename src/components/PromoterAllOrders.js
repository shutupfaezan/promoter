import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function PromoterAllOrders() {
    const navigate = useNavigate();
    const params = useParams()
    const [orderData, setOrderData] = useState()
    useEffect(() => {
      const fetchEventData = async () => {
          try {
            const encodedEventName = encodeURIComponent(params?.event_name);
              const { data } = await axios.get(`https://nightlife-2710.herokuapp.com/promoter-orders?event_name=${encodedEventName}&promoter_access_token=${sessionStorage?.promoter_token}`)
              const { Event_Information, Order_Details } = data;
              setOrderData(Order_Details);
            } catch (error) {
              console.log(error);
          }
      };
      fetchEventData();
  }, [params.event_name]);
    
        const order_array = orderData?.map?.(response => response?.ticket_category)
        const controlled_orders = [...new Set(order_array)]

    const handleGoBack = () => {
      navigate(-1);
    };
  return (
    <div>
        <nav className='w-100 bg-light'>
            <i className="fa-solid fa-arrow-left m-3" style={{fontSize: "30px"}} onClick={handleGoBack}></i>
        </nav>
        <div className='pt-4 w-100'>
      {controlled_orders?.length === 0 ? <><div className='mx-md-5 text-center p-4 mx-3 my-5' style={{background: "#e8ebee", borderRadius: "10px"}}>No orders yet! Inform People about your event and share them the link to make it easy for them to order. Good Luck</div></> :
      <div className='overflow-scroll mx-md-5 d-flex d-md-block'>
        <Tabs>
          <TabList style={{padding: "5px", marginBottom: "3rem"}}>
            {controlled_orders?.map((identity, index) => (
              <Tab key={index}>{identity}</Tab>
            ))}
          </TabList>
          {controlled_orders?.map((identity, index) => {
            const filteredOrders = orderData?.filter(
              (order) => order.ticket_category === identity
            );
            return (
              <TabPanel key={index}>
                <table className="table">
                  <thead style={{color: "white", background: "black", fontSize: "15px"}}>
                    <tr className='d-flex'>
                      <th className='col'>Order Id</th>
                      <th className='col'>UserName</th>
                      <th className='col'>Quantity</th>
                      <th className='col'>Bill Total</th>
                      <th className='col-3'>Description</th>
                      <th className='col'>Status</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "15px"}}>
                    {filteredOrders?.map((order, key) => (
                      <tr className="d-flex" key={key}>
                        {console.log(order)}
                        <td className='col'>{order.order_id}</td>
                        <td className='col'>{order.user_name}</td>
                        <td className='col'>{order.quantity}</td>
                        <td className='col'>₹{order.total_price}</td>
                        <td className='text-truncate col-3'>{order.description}</td>
                        <td  className='col'
                          style={{
                            color:
                              order?.status === "Unpaid" ? "#b10808" : order?.status === "Paid" ? "#444439"  : "green",
                          }}
                        >
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>}
    </div>
    </div>
  )
}
