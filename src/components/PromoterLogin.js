import React, { useState } from 'react'
import Input from '../common/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import axios from 'axios'
import * as Yup from 'yup'


export default function PromoterLogin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: ""
    },
    validationSchema: Yup.object({
      email_id: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .matches(/.{8}/, "Password must be at least 8 characters") 
        .required('Required')
    }),
    onSubmit: (values)=>{
      setIsLoading(true)
      setError(null)
      axios.post(`https://nightlife-2710.herokuapp.com/promoter-login`, values)
      .then((response)=>{
          setIsLoading(false)
          sessionStorage.setItem("promoter_token", response?.data?.access_token)
          sessionStorage.setItem("promoter_name", response?.data?.promoter_name)
          navigate('/promoter-dashboard')

      })
      .catch((error)=>{
        setIsLoading(false)
        setError(error?.response?.data?.detail)
      })
    }
  })

  return (
    <div className='d-flex vh-100'>
      <div className='col' style={{background: "#F5F5F5", height: "100%"}}>
        <nav className='p-2 px-lg-5 position-absolute top-0'>
          <h2 className='primary-header mb-0 px-lg-5 px-3 py-2'>BottmzUP</h2>
        </nav>
        <div className="d-flex flex-column justify-content-center px-lg-5 px-4" style={{height: "100%"}}>
          <div className='px-lg-5'>
          <h1 className='primary-header' style={{color: "transparent", WebkitTextStroke: "1px black"}}>Promoter/Club</h1>
          <h1 className='primary-header'>Log In</h1>
          </div>
          <form className='px-lg-5 col-lg-10' onSubmit={formik.handleSubmit}>
            <div className='mt-3'>
            <Input type="email" label="Email:" id="email_id" iconLeft="fa-solid fa-envelope" handleChange={formik.handleChange} value={formik.values.email_id} name="email_id"></Input>
            {formik.errors.email_id && formik.touched.email_id && <small className="text-danger">{formik.errors.email_id}</small>}
            </div>
            <div className='mt-2'>
            <Input type="password" label="Password:" id="password" iconLeft="fa-solid fa-lock" iconRight="fa-solid fa-eye" iconRightAlter="fa-solid fa-eye-slash"  handleChange={formik.handleChange} value={formik.values.password} name="password"></Input>
            {formik.errors.password && formik.touched.password && <small className="text-danger">{formik.errors.password}</small>}
            </div>
            {error && <small className='text-danger'>{error}</small>}
            <button className='btn btn-secondary mt-3 w-100 p-2' disabled={isLoading ? true: false} type="submit" style={{background: "black", borderRadius: "10px"}}>
              {isLoading && (<span id="login-loader-span" className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>)}
              {isLoading && (<span id="login-loading-text-span">Loading</span>)}
              {!isLoading && <span id="login-text-span">Login</span>}
            </button>
            <Link to="https://bottmzup.com/contact-us" className='w-100 d-flex justify-content-center mt-3' style={{color: "black", textDecoration: "none"}}>Not a promoter? Be one now</Link>
          </form>
        </div>
      </div>
      <div className='col d-md-block d-none'>
        <img style={{height: "100%", width: "100%", objectFit: "cover"}} src={process.env.PUBLIC_URL + "/images/lottapeeps.jpeg"} alt=""/>
      </div>
    </div>
  )
}