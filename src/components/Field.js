import React from "react";
import Error from "./Error";

const Field=({error, ...rest})=>{
    return(
        <>
            <input {...rest}/>
            {error && <Error text={error}/>}
        </>
    )
}
export default Field;