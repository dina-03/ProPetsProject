import React from "react";
import {Link, NavLink} from "react-router-dom";
import './../css/Home.css';
import './../css/LeftSide.css';
import {faDog, faHome, faHotel, faPaw, faSearch, faStethoscope, faWalking} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import auth from "../store/auth";
import {useSelector} from "react-redux";
import {appSelector} from "../store/app";

const LeftSide = () => {

    const {auth} = useSelector(appSelector);

    return (
        <div className='leftSide'>
            <div className='leftMenu'>
                <div className='linkMenu'>
                    {auth ? <NavLink to={'/posts'}>
                        <Button text={'Home'} icon={faHome}/>
                    </NavLink> : <Link to={'/'}/>}
                </div>
                <div className='linkMenu'><NavLink to={'/lost'}><Button text={'Lost'} icon={faSearch}/>
                </NavLink></div>
                <div className='linkMenu'><NavLink to={'/found'}><Button text={'Found'} icon={faPaw}/>
                </NavLink></div>
            </div>
            {auth && <div className='leftMenuService'>
                <h3>Services</h3>
                <div>
                    <div className='linkMenu'><NavLink to={`/service/Hotels`}><Button text={'Hotels'}
                                                                                      icon={faHotel}/></NavLink></div>
                    <div className='linkMenu'><NavLink to={`/service/Walking`}><Button text={'Walking'}
                                                                                       icon={faWalking}/></NavLink>
                    </div>
                    <div className='linkMenu'><NavLink to={`/service/Fostering`}><Button text={'Fostering'}
                                                                                         icon={faDog}/></NavLink></div>
                    <div className='linkMenu'><NavLink to={`/service/VetHelp`}><Button text={'VetHelp'}
                                                                                       icon={faStethoscope}/></NavLink>
                    </div>

                </div>
            </div>}


        </div>
    )
}

export default LeftSide;