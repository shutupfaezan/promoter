import React, {useState} from 'react';
// import axios from 'axios';
import { useFormik } from 'formik'
import Input from '../common/Input';
import { useContext } from 'react';
import { SingularContext } from '../contexts/Context';


export default function PromoterEventInfo() {
  const { eventInfoValue , setEventStepper, eventStepper } = useContext(SingularContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
    const [arr, setArr] = useState(['']);
    
    const addInput = () => {
        setArr([...arr, '']);
    };
    const handleChange = (index, event) => {
        const newValues = [...arr];
        newValues[index] = event.target.value;
        setArr(newValues);
    }

    const initialValues = {
            event_name: "",
            event_venue: "",
            curated_by: "",
            contact: null,
            date: null,
            timings: "",
            genre: "",
            price_range: "",   
            description: "",    
            featuring: "",
            images_url: "",
            terms: []
        }
        const validate = values => {
            const errors = {};
            if (!values.event_name) {
              errors.event_name = 'Event name is required';
            }
            if (!values.event_venue) {
              errors.event_venue = 'Venue/Club name is required';
            }
            if (!values.curated_by) {
              errors.curated_by = 'Curator name is required';
            }
            if (!values.contact) {
              errors.contact = 'Contact number is required';
            } else if (!/^[789]\d{9}$/.test(values.contact)) {
              errors.contact = 'Contact should be a 10 digit number';
            }
            if (!values.date) {
              errors.date = 'Date is required';
            }
            if (!values.timings) {
              errors.timings = 'Timings are required';
            }
            if (!values.featuring) {
              errors.featuring = 'Featuring is required';
            }
            if (!values.genre) {
              errors.genre = 'Genre is required';
            }
            if (!values.price_range) {
              errors.price_range = 'Price range is required';
            }
            if (!values.description) {
              errors.description = 'Description is required';
            }
            return errors;
          };
    const formik = useFormik({
        initialValues,
        validateOnChange: true,
        validate,
        onSubmit: SubmitEventInfo,
    })

    const validateFile = (file) => {
        if (!file) {
          setError('Please select an image file.');
          return false;
        }
        // if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        //   setError('Please select a JPEG or PNG image file.');
        //   return false;
        // }
        if (file.size > 1024 * 1024) {
          setError('Selected file size is too large. Maximum size is 1MB.');
          return false;
        }
        setError(null);
        return true;
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        const isValid = validateFile(file);
        if (isValid) {
          setSelectedFile(file);
        } else {
          setSelectedFile(null);
        }
      };
    
    function SubmitEventInfo(event) {
        // event.preventDefault();
        const eventInfo = { ...formik.values, terms: [...arr], images_url: selectedFile };
        eventInfoValue.event_information = eventInfo;
        console.log(eventInfoValue)
        setEventStepper(eventStepper + 1);
      }
  return (
    <div className='mt-0 mt-md-4 ps-md-2 pe-lg-5 pe-md-2'>
            <form className='d-flex flex-column' style={{height: "100%", fontSize: "14px", fontWeight: "400 !important"}}>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6 px-0 pe-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Event Name:</label>
                        <Input name="event_name" handleChange={formik.handleChange} value={formik.values.event_name} placeholder="Enter Event Name" useInput={1} error={formik.touched.event_name && formik.errors.event_name} handleBlur={formik.handleBlur}></Input>
                        {formik.errors.event_name && (
                        <div className="text-danger ms-2">{formik.errors.event_name}</div>
                        )}
                    </div>
                    <div className='d-flex flex-column col-lg-6 px-0 ps-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Date:</label>
                        <Input name="date" placeholder="DD-MM-YYYY" handleChange={formik.handleChange} value={formik.values.date} type="date" useInput={1} error={formik.touched.date && formik.errors.date} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.date && formik.errors.date && (
                        <div className="text-danger ms-2">{formik.errors.date}</div>
                        )}
                    </div>
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6 px-0 pe-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Venue/Club Name:</label>
                        <Input name="event_venue" handleChange={formik.handleChange} value={formik.values.event_venue} placeholder="Enter Club Name" useInput={1} error={formik.touched.event_venue && formik.errors.event_venue} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.event_venue && formik.errors.event_venue && (
                        <div className="text-danger ms-2">{formik.errors.event_venue}</div>
                        )}
                    </div>
                    <div className='d-flex flex-column col-lg-6 p-0 px-0 ps-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Contact:</label>
                        <Input name="contact" type="number" handleChange={formik.handleChange} value={formik.values.contact} placeholder="Enter contact for table pricing" useInput={1} error={formik.touched.contact && formik.errors.contact} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.contact && formik.errors.contact && (
                        <div className="text-danger ms-2">{formik.errors.contact}</div>
                        )}
                    </div>
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6 px-0 pe-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Curated By:</label>
                        <Input name="curated_by" handleChange={formik.handleChange} value={formik.values.curated_by} placeholder="Enter Organizer Name" useInput={1} error={formik.touched.curated_by && formik.errors.curated_by} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.curated_by && formik.errors.curated_by && (
                        <div className="text-danger ms-2">{formik.errors.curated_by}</div>
                        )}
                    </div>  
                    <div className='d-flex flex-column col-lg-6 px-0 ps-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Timings:</label>
                        <Input name="timings" handleChange={formik.handleChange} value={formik.values.timings} placeholder='00:00-00:00' useInput={1} error={formik.touched.timings && formik.errors.timings} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.timings && formik.errors.timings && (
                        <div className="text-danger ms-2">{formik.errors.timings}</div>
                        )}
                    </div>  
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col p-0'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Featuring:</label>
                        <Input name="featuring" handleChange={formik.handleChange} value={formik.values.featuring} placeholder="Enter Artist/Dj Name" useInput={1} error={formik.touched.featuring && formik.errors.featuring} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.featuring && formik.errors.featuring && (
                        <div className="text-danger ms-2">{formik.errors.featuring}</div>
                        )}
                    </div>  
                </div>
                <div className='d-md-flex mb-2'>
                    <div className='d-flex flex-column col-lg-6  px-0 pe-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Price Range:</label>
                        <Input name="price_range" handleChange={formik.handleChange} value={formik.values.price_range} placeholder="Eg: 1000 - 3000" useInput={1} error={formik.touched.price_range && formik.errors.price_range} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.price_range && formik.errors.price_range && (
                        <div className="text-danger ms-2">{formik.errors.price_range}</div>
                        )}
                    </div>  
                    <div className='d-flex flex-column col-lg-6 px-0 ps-md-3'>
                        <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Genre:</label>
                        <Input name="genre" handleChange={formik.handleChange} value={formik.values.genre} placeholder="Select" useInput={1} error={formik.touched.genre && formik.errors.genre} handleBlur={formik.handleBlur}></Input>
                        {formik.touched.genre && formik.errors.genre && (
                        <div className="text-danger ms-2">{formik.errors.genre}</div>
                        )}
                    </div>  
                </div>
                <div className="d-flex flex-column col p-0 mb-2">
                    <label htmlFor="formFile" className=" ms-2 mb-1" style={{fontWeight: "400"}}>Event Poster</label>
                    <input className="p-2" style={{border: "2px solid black", borderRadius: "10px", fontSize: "14px", fontWeight: "400"}} onChange={handleFileChange} type="file" id="formFile" useInput={1}/>
                    {error && <div className="text-danger">{error}</div>}
                </div>
                <div className='d-flex flex-column col p-0 mb-2'>
                    <div className="d-flex align-items-center"><label className='ms-2 mb-1'  style={{fontWeight: "400"}}>Terms And Conditions:</label></div>
                    {arr.map((item, index) => {
                    return (
                        <>
                        <div className='d-flex mb-2'>
                        <div className='col-10 p-0 pe-2'>
                    <Input
                        key={`item.${index}.value`}
                        name={`item.${index}.value`}
                        id={index}
                        value={item}
                        type={item.type}
                        placeholder="Enter event terms and conditions"
                        handleChange={(event)=> handleChange(index, event)}
                        useInput={1}
                        error={formik.errors.terms}
                        handleBlur={formik.handleBlur}
                    />
                    </div>
                    <div  onClick={addInput} className='d-flex justify-content-center align-items-center col-2' style={{background: "black", borderRadius: "10px"}}>
                    <i onClick={addInput} className="fa-solid fa-plus ms-auto col-md-none mx-auto d-block d-md-none mb-1 align-self-center" style={{fontSize: "18px", color: "white"}} ></i>
                    <p className='text-white m-0 d-md-block d-none'>Add More</p>
                    </div>
                    </div>
                    </>
                    );
                    })}
                </div>
                <div className='d-flex flex-column col p-0'>
                    <label className='ms-2 mb-1' style={{fontWeight: "400"}}>Description:</label>
                    <textarea name="description" onChange={formik.handleChange} value={formik.values.description} placeholder="About The Event" className="form-control" style={{borderRadius: "10px", height: "100px", border: "2px solid black"}}  error={formik.errors.description}></textarea>
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-danger ms-2">{formik.errors.description}</div>
                    )}
                </div>
                <div className='d-flex justify-content-center w-100'>
                <button type="submit" onClick={formik.handleSubmit} className="btn mt-3 col-lg-4 px-3 py-2 text-white" style={{background: "black", borderRadius: '10px'}}>Continue to Pricing...</button>
                </div>
            </form>
    </div>
  )
}
