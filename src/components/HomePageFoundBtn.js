import React from "react";
import './../css/Buttons.css'
import {Link, useHistory} from "react-router-dom";

export default function HomePageFoundBtn (){
    const {push}=useHistory();
    return(
         <button className='btnFound' onClick={e=>push(`/found`)}>
            <div className='btnFoundText'>

            </div>
        </button>
    )
}
