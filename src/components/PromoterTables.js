import React, {useState} from 'react';
import Input from '../common/Input';
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';


export default function PromoterTables() {
    const [items, setItems] = useState([]);
    const [errors, setErrors] = useState(null);
    const [ticket_category, setTicket_Category] = useState('')
    const [description, setDescription] = useState('')
    const [cover_description, setCover_Description] = useState('')
    const [price, setPrice] = useState("")
    const [total_quantity, set_Total_Quantity] = useState("")
    const { eventInfoValue, setEventStepper, eventStepper} = useContext(SingularContext);

    function handlePriceChange(event) {
        if (!/-?\d*\.?\d*/.test(event.target.value)) {
          setErrors("Please enter a valid price.");
        } else {
          setPrice(event.target.value);
          setErrors(null);
        }
      }
      
      function handleQuantityChange(event) {
        if (!/^\d+$/.test(event.target.value)) {
          setErrors("Please enter a valid quantity.");
        } else {
        set_Total_Quantity(event.target.value);
          setErrors(null);
        }
      }



      function handleAddItem(event) {
        const errors = [];
        if (!ticket_category) {
          errors.push("Table category is required");
        }
        if (!cover_description) {
          errors.push("Table Benefits is required");
        }
        if (!description) {
          errors.push("Table description is required");
        }
        if (price.toString().includes("-")) { // Fixed
          errors.push("Price must not contain a hyphen.");
        } else if (!price) {
          errors.push("Enter a valid Price");
        }
        if (!total_quantity) {
          errors.push("Total quantity is required");
        } else if (total_quantity.toString().includes("-")) {
          errors.push("Total Quantity must not contain a hyphen.");
        }
      
        if (errors.length > 0) {
          setErrors(errors.join(", "));
          return;
        }
      
        setErrors(null);
      
        // if (errors.length > 0) {
        //   setErrors(errors.join(", "));
        //   return;
        // }
      
        setErrors(null);
      
        const newItem = {
          ticket_category,
          description,
          cover_description,
          price,
          total_quantity
        };
        setItems([...items, newItem]);
      
        setTicket_Category("");
        setDescription("");
        setCover_Description("");
        setPrice("");
        set_Total_Quantity("");
      
        event.target.value = null;
      }
      
      

    function submitPricing() {
        const table_info = items;
        eventInfoValue.table_information = table_info;
        console.log(eventInfoValue)
        setEventStepper(eventStepper + 1);
      }
      
    
  return (
    <div className='mt-0 mt-md-4 ps-md-2 pe-lg-5 pe-md-2'>
            <div className='col p-0 mb-2'>
            <label className='ms-2 mb-1'>Table Categories<span style={{color: "crimson"}}>*</span></label>
            <Input name="ticket_category" placeholder="Enter a table category" id="ticket_category" value={ticket_category} handleChange={event=>setTicket_Category(event.target.value)}  useInput={1}></Input>
            </div>
            <div className='d-md-flex mb-2'>
                <div className='col-lg-6 px-0 pe-md-3'>
                <label className='ms-2 mb-1'>Table Benefits<span style={{color: "crimson"}}>*</span></label>
                <Input name="ticket_category" placeholder="Eg:- No Cover" id="ticket_category" value={cover_description} handleChange={event=>setCover_Description(event.target.value)} useInput={1}></Input>
                </div>
                <div  className='col-lg-6 px-0 ps-md-3'>
                <label className='ms-3 mb-1'>Description:</label>
                <Input name="description" placeholder="No. of people allowed on a table" id="description" value={description} handleChange={event=>setDescription(event.target.value)} useInput={1}></Input>
                </div>
            </div>
            <div className='d-md-flex mb-2'>
                <div className='col-lg-6 px-0 pe-md-3'>
                <label className='ms-3 mb-1'>Price (per table)<span style={{color: "crimson"}}>*</span></label>
                <Input name="price" type="number" placeholder="Eg:- Rs. 100000" id="price" value={price} handleChange={handlePriceChange} useInput={1}></Input>
                </div>
                <div  className='col-lg-6 px-0 ps-md-3'>
                <label className='ms-3 mb-1'>Total Quantity<span style={{color: "crimson"}}>*</span></label>
                <Input name="total_quantity" type="number" placeholder="Number of tables available for this category" id="total_quantity" value={total_quantity} handleChange={handleQuantityChange} useInput={1}></Input>
                </div>
            </div>
            <div>
                {errors && <span style={{color: "crimson"}}>{errors}</span>}
            </div>
        <div className='d-md-flex justify-content-between my-3 col p-0'>
        <button type="submit" style={{background: "crimson", borderRadius: "10px"}} onClick={handleAddItem} className="m-md-2 my-2 btn col-md-5 text-white p-0 py-2 ms-md-5">Add Pricing Category</button>
        <button type="submit" style={{background: "black", borderRadius: "10px"}} onClick={submitPricing} className="m-md-2 my-2 btn col-md-5 text-white p-0 py-2 me-md-5">Skip and/or Review</button>
        </div>
        <div>
        <b className='my-3 ms-3'>Your added categories apper here:</b> 
        {items?.[0] && <div className='mt-3'>
            <table className="table table-hover">
            <thead style={{color: "white", background: "black"}}>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
                <tbody>
                  {items?.map((identity, fields)=>{
                      return <tr key={fields}>
                        <td style={{alignItems: "center", width: "33%", fontWeight: "400"}}>
                        <b style={{display: "block"}}>{identity.ticket_category}</b>
                        <span style={{display: "block"}}>{identity.cover_description}</span>
                        <span style={{display: "block"}}>{identity.description}</span>
                        </td>
                        <td>
                            <span>{identity.price}</span>
                        </td>
                        <td>
                            <span>{identity.total_quantity}</span>
                        </td>
                        </tr>
                    })}
                </tbody>
              </table>
              </div>}
        </div>
        </div>
  )
}
