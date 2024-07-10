import { ApiError } from "../Responses/ApiError";
import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";

export const useAuth = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw new ApiError(510,"Context can only be used inside the scope")
    }

    return context;
}