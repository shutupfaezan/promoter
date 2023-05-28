import {createContext, useState} from "react"
 
export const SingularContext = createContext()

const Context = ({ children }) => {
    const [eventStepper, setEventStepper] = useState(1);
    const [eventInfoValue] = useState({});
  
    return (
      <SingularContext.Provider value={{ eventInfoValue, eventStepper, setEventStepper }}>
        {children}
      </SingularContext.Provider>
    );
  };
  

export default Context