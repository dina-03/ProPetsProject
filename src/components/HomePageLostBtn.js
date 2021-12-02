import React from "react";
import logoLost from './../img/lost-icon.svg';
import { useHistory} from "react-router-dom";

export default function HomePageLostBtn(){
    const {push}=useHistory();
    return(
       <button className='btnLost' onClick={e=>push(`/lost`)}>
            <div className='btnLostText'>

            </div>
            <img src={logoLost} alt={logoLost}/>
        </button>
    )
}
