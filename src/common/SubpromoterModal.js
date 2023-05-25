import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SubpromoterModal(props) {
  const [isLoading, setIsLoading] = useState(false)
    const [subInput, setSubInput] = useState([])
    const [error, setError] = useState(null)
    const subpromoterInputs = () => {
        axios.get(`https://nightlife-2710.herokuapp.com/get-sub-promoter-inputs`)
        .then((response)=>{
            setSubInput(response?.data?.sub_promoter_inputs)
        })
    }

    useEffect(()=>{
         subpromoterInputs()
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = name === 'sub_promoter_contact' ? parseInt(value, 10) : value;
        formik.setFieldValue(name, parsedValue);
    };
    
        const initialValues = subInput.reduce((acc, input) => {
            acc[input.label_name] = null;
            return acc;
        }, {});

        const validationSchema = Yup.object().shape({
          sub_promoter_name: Yup.string().required('Name is required'),
          sub_promoter_email_id: Yup.string().email('Invalid email address').required('Email is required'),
          sub_promoter_contact: Yup.string()
            .test('is-valid-contact', 'Invalid contact number', (value) => {
              // Check if the value is not empty, is a valid number, and is not NaN
              return value && /^[789]\d{9}$/.test(value) && !isNaN(Number(value));
            })
            .required('Contact number is required'),
        });
        
                  
        
        // const resetFormFields = () => {
          //   const initialFormValues = subInput.reduce((acc, input) => {
            //     acc[input.label_name] = '';
            //     return acc;
            //   }, {});
            //   formik.setValues(initialFormValues);
            // };
            
            const formik = useFormik({
              initialValues,
              validationSchema, 
              validateOnSubmit: true,
              onSubmit: (values, { resetForm }) => {
                console.log(values)
                setError(null)
                setIsLoading(true)
                axios.post(`https://nightlife-2710.herokuapp.com/add-subpromoters?event_id=${props.eventID}&promoter_access_token=${sessionStorage?.promoter_token}`, values)
                .then(()=>{
                  setIsLoading(false)
                  props.handleClose()
                  window.location.reload()
            })
            .catch((error)=>{
              setIsLoading(false)
              console.log(error)
              // resetFormFields();
              setError(error?.response?.data?.detail)
            })
          },
        });
        
        return (
          <Modal show={props.show} onHide={props.handleClose} centered style={{}}>
        <h4 className='primary-header mx-auto py-1 pt-3' style={{color: "crimson"}}>Add a Sub-Promoter</h4>
        <form onSubmit={formik.handleSubmit}>
        { 
            subInput && subInput?.map((identity, index)=>{
                return (
                    <div className={`px-md-5 py-1 px-4 ${formik.errors[identity.label_name] && formik.touched[identity.label_name] ? 'is-invalid' : ''}`} key={index}>
                      <Input
                        label={identity.label + ":"}
                        placeholder={identity.placeholder}
                        name={identity.label_name}
                        type={identity.type}
                        handleChange={handleInputChange}
                        value={formik.values[identity.label_name]}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched[identity.label_name] && formik.errors[identity.label_name] && (
                        <div className='text-danger'>{formik.errors[identity.label_name]}</div>
                      )}
                    </div>
                  );
                  
            })
            }
            {
              error && <small className='text-danger px-md-5 px-4 mx-2'>{error}</small>
            }
        <button className='btn btn-danger col-md-5 col-6 my-4 rounded-pill mx-auto d-flex align-items-center justify-content-center' type="Submit"  disabled={isLoading ? true: false} style={{background: "black"}}>
        {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              {!isLoading && <span id="login-text-span">Complete Action</span>}
        </button>
        </form>
    </Modal>
  )
}
