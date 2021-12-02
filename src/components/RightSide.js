import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faTimesCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {authSuccess, userSelector} from "../store/app";
import {getUserByIdAction, logoutAction} from "../store/auth";
import './../css/RightSide.css'

const RightSide = () => {
    const current = useSelector(userSelector);
    const dispatch = useDispatch();

    return current ? (
        <div className='rightSide'>
            <div className='rightUser'>
                {current && (
                    <Link to={'/profile'} className='userProfileBtn'>
                        {current.avatar ? (
                            <div className='usersAvatar'>
                                <img src={`http://localhost:5010/${current.avatar}`}
                                     alt='avatar'/>
                            </div>
                        ) : (
                            <div className='usersAvatar'>
                                <FontAwesomeIcon size='3x' icon={faUser}/>
                            </div>
                        )}
                        <h4>{current.full_name}</h4>
                    </Link>
                )}
            </div>
            <Link to={'/'} onClick={() => dispatch(logoutAction())} className='logoutBtn'>
                <FontAwesomeIcon icon={faSignOutAlt}/>&nbsp; Logout
            </Link>
        </div>
    ) : <div className='userNotDef'>
       <h4>Please register or sign in, to see more... <br/> Click 'Sign in' or 'Sign up'</h4>
    </div>
}

export default RightSide