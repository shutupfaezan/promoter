import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from "../common/Input";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { MobileOnlyView } from 'react-device-detect';

export default function PromoterAllOrders() {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [filteredOrderData, setFilteredOrderData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data } = await axios.get(`https://nightlife-2710.herokuapp.com/promoter-orders?event_id=${sessionStorage.onClickSingluarEventCall_ID}&promoter_access_token=${sessionStorage?.promoter_token}`);
        setOrderData(data.Order_Details);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    let filteredData = orderData;
  
    if (filterValue) {
      filteredData = orderData?.filter(order =>
        (order.sub_promoter_name && order.sub_promoter_name.trim().toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        (order?.user_name && order?.user_name.toLowerCase().includes(filterValue.trim().toLowerCase())) ||
        (order?.status && order?.status.toLowerCase() === filterValue.trim().toLowerCase()) || // Change to strict equality check
        (order?.order_id && order?.order_id.toLowerCase().includes(filterValue.trim().toLowerCase()))
      );
    }
  
    setFilteredOrderData(filteredData);
  }, [filterValue, orderData]);
  
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const subSearch = event => {
    setFilterValue(event.target.value);
  };

  const order_array = filteredOrderData?.map?.(response => response?.ticket_category);
  const controlled_orders = [...new Set(order_array)];

  return (
    <div>
      <nav className='w-100 bg-light'>
        <i className='fa-solid fa-arrow-left m-3' style={{ fontSize: '30px' }} onClick={handleGoBack}></i>
      </nav>
      <div className='d-flex justify-content-end mx-md-5 my-4'>
        <div className='col-md-3 col px-4 p-md-0'>
          <Input iconLeft='fa-solid fa-magnifying-glass' placeholder='Filter Items' handleChange={subSearch}></Input>
        </div>
      </div>
      <MobileOnlyView className='text-center px-4'>
        <div className="p-4" style={{background: "#E8EBEE", borderRadius: "10px"}}>
        Use a Tablet or Laptop device to view complete orders
        </div>
      </MobileOnlyView>
      <div className='pt-4 w-100 d-md-block d-none'>
        {controlled_orders?.length === 0 ? (
          <div className='mx-md-5 text-center p-4 mx-3 my-5' style={{ background: '#e8ebee', borderRadius: '10px' }}>
            No orders yet! Inform people about your event and share the link to make it easy for them to order. Good Luck
          </div>
        ) : (
          <div className='overflow-scroll mx-md-5 d-flex d-md-block'>
            <Tabs>
              <TabList style={{ marginBottom: '2rem' }}>
                {controlled_orders?.map((identity, index) => (
                  <Tab key={index}>{identity}</Tab>
                ))}
              </TabList>
              {controlled_orders?.map((identity, index) => {
                const filteredOrders = filteredOrderData?.filter(order => order.ticket_category === identity);
                return (
                  <TabPanel key={index}>
                    <table className='table'>
                      <thead style={{ color: 'white', background: 'black', fontSize: '15px' }}>
                        <tr className='d-flex'>
                          <th className='col'>Order Id</th>
                          <th className='col'>UserName</th>
                          <th className='col'>Quantity</th>
                          <th className='col'>Bill Total</th>
                          <th className='col'>Sub-Promoter</th>
                          <th className='col-2'>Description</th>
                          <th className='col'>Status</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: '15px' }}>
                        {filteredOrders?.map((order, key) => (
                          <tr className='d-flex' key={key}>
                            <td className='col'>{order.order_id}</td>
                            <td className='col'>{order.user_name}</td>
                            <td className='col'>{order.quantity}</td>
                            <td className='col'>₹{order.total_price}</td>
                            <td className='col'>{order.sub_promoter_name === null ? 'None' : order.sub_promoter_name}</td>
                            <td className='text-truncate col-2'>{order.description}</td>
                            <td
                              className='col'
                              style={{
                                color: order?.status === 'Unpaid' ? '#b10808' : order?.status === 'Paid' ? '#444439' : 'green',
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
          </div>
        )}
      </div>
    </div>
  );
}
