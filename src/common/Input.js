import React, { useState } from 'react'

export default function Input(props) {
  const [eyeInstance, setEyeInstance] = useState(false)
  function hidepassword(){
    var temp = document.getElementById(props.id);
    if (temp.type === "password") {
      setEyeInstance(true)
        temp.type = "text";
    }
    else {
        temp.type = "password";
        setEyeInstance(false)
    }
  }

  function copyInputValue(inputId) {
    const inputElement = document.getElementById(inputId);
  
    if (inputElement) {
      inputElement.select();
      inputElement.setSelectionRange(0, 99999); // For mobile devices
  
      document.execCommand('copy');
    }
  }
  
  return (
    <>
    <div className='d-flex flex-column'>
      <label style={{fontWeight: "400"}}>{props.label}</label>
      <div  className='position-relative'>
      <i className={props.iconLeft} style={{fontSize: "20px", top: "12px", left: "10px", position: "absolute"}}></i>
      {props.type !== "TEXTAREA" && <input name={props.name} id={props.id} type={props.type} placeholder={props.placeholder} onChange={props.handleChange} value={props.value} onBlur={props.onBlur} error={props.error} className='form-control' style={{border: "2px solid black", borderRadius: "10px",padding: "0.5rem", paddingLeft: props.iconLeft ? "38px": null, paddingRight:  props.iconRight ? "38px": null}}></input>}
      {props.type === "TEXTAREA" && <textarea name={props.name} id={props.id} type={props.type} placeholder={props.placeholder} onChange={props.handleChange} value={props.value} className='form-control' style={{border: "2px solid black", borderRadius: "10px",padding: "0.5rem", paddingLeft: props.iconLeft ? "38px": null, paddingRight:  props.iconRight ? "38px": null}}></textarea>}
      <i style={{fontSize: "20px", top: "12px", right: "10px", position: "absolute"}} onClick={props.iconRight === "fa-solid fa-eye" ? hidepassword : props.iconRight === "fa-solid fa-copy" ? () => copyInputValue(props.id) : null} className={props.iconRight === "fa-solid fa-eye" ? (eyeInstance ? props.iconRightAlter : props.iconRight) : props.iconRight}></i>
      </div>
    </div>
    </>
  )
}
