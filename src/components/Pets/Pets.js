import React, {useEffect} from "react";
import './../../css/Pets.css';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../store/app";
import {getPetsAction, petsSelector} from "../../store/pet";
import PetBox from "./PetBox";

const Pets = () => {
    const {pathname} = useLocation();
    const auth = useSelector(authSelector);
    const path = pathname.slice(1);
    const {pets} = useSelector(petsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPetsAction(path))
    }, [dispatch, path]);

    return pets && (
        <div className='lostContent'>
            <div className='lostContentTitle'><h4><b>{pathname.slice(1)}</b>  pets</h4></div>
            <div className='lostContentBox'>
            {!auth && <p>
                Would you like to publish a post?
                <Link to='/signin'> JOIN </Link> to our community
            </p>}
                <div className='lostContentBox'>
            {pathname.slice(1) === 'lost' ? pets.petsArr.map((pet, index) => (
                <PetBox key={index} pet={pet} index={pet.id}/>
            )) : pets.petsArr.map((pet, index) => (
                <PetBox key={index} pet={pet} index={pet.id}/>
            ))}</div>
            </div>
        </div>
    )
}
export default Pets;