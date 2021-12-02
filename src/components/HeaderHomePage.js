import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelector} from "../store/app";
import LogoHeader from './../img/logo-white.svg';
import LogoHeaderDark from './../img/LogoDark.png';
import './../css/Home.css';
import './../css/Buttons.css'
import Button from "./Button";
import {faPaw, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {petsSelector} from "../store/pet";

const HeaderHomePage = () => {

    const auth = useSelector(authSelector);
    const {pathname} = useLocation();
    const path = pathname.slice(1);
    const {pets} = useSelector(petsSelector);

    return (

        <div className='navigationHeader'>
            {auth ? (
                <div className='headerHomePageUser'>
                    <Link to='/posts'>
                        <button className='headerBtnLogoDark'><img src={LogoHeaderDark} alt='logo'/></button>
                    </Link>
                    {auth ? (
                        <div className='headerAdd'>
                            {((path === 'lost' || path === 'found') && pets) ? (
                                <div className='lost-foundBtn'>
                                    <Link to='/lost/add'>
                                        <button className='btnLostNav'><FontAwesomeIcon icon={faSearch}/> I lost my pet</button>
                                    </Link>
                                    <Link to='/found/add'>
                                        <Button text={'I found a pet'}
                                                icon={faPaw}/>
                                    </Link>
                                </div>) : (
                                <>
                                    {path === 'posts' && (
                                        <Link to='/posts/add'>
                                            <Button text={'Add new'} icon={faPlus}/>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    ) : path === 'found' || path === 'lost' || path.startsWith('pet/')}

                </div>
            ) : (<>
                    <div className='headerHomePage'>
                        <div className='headerLogo'><Link to='/'>
                            <button className='headerBtnLogo'><img src={LogoHeader} alt='logo'/></button>
                        </Link>
                        </div>
                        <Link to='/signin'>
                            <button className='singInHeaderBtn'>Sing In</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default HeaderHomePage;



