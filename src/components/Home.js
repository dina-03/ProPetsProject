import React from "react";
import './../css/Home.css';
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Content from "./Content";

const Home=()=>{
    return(
        <div className='homeBox'>
            <LeftSide/>
            <Content/>
            <RightSide/>
        </div>
    )
}

export default Home;