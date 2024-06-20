import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

const [name,setName] = useState()




const getName =(value)=>{
    setName(value)
}


    return <AuthContext.Provider value={{name,getName ,setName}}>{children}</AuthContext.Provider>

}