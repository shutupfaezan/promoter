import React, { useState } from 'react';

import Input from '../common/Input';

const EventInformation = () => {
  const [eventInformation, setEventInformation] = useState();

  const handleAddTermsCondition = () => {
    const newTermsCondition = {
      label: "Terms & Conditions",
      type: "textarea",
      placeholder: "Enter Your Terms & Conditions",
      label_name: "termsconditions",
    };
    setEventInformation([...eventInformation, newTermsCondition]);
  };

  return (
    <div>
      <h1>Event Information</h1>
      <div>
        {eventInformation.map((item, index) => (
          <div key={index}>
            <label htmlFor={item.label_name}>{item.label}</label>
            <Input
              key={index}
              type={item.type}
              placeholder={item.placeholder}
              name={item.label_name}
            />
          </div>
        ))}
        <button onClick={handleAddTermsCondition}>Add Terms & Condition</button>
      </div>
    </div>
  );
};

export default EventInformation;
