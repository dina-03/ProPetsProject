import '../../css/Pets.css';
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarker, faSearch} from "@fortawesome/free-solid-svg-icons";
import {useHistory, useParams} from "react-router-dom";
import {getPetsAction, petsSelector, petUpdateAction, deletePetAction, getPetAction} from "../../store/pet";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {authSelector, userSelector} from "../../store/app";

const FullInfoPet = () => {
    const {id} = useParams();
    const user = useSelector(userSelector);
    const {push} = useHistory();
    const {currentPet} = useSelector(petsSelector);
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    useEffect(() => {
        dispatch(getPetAction(parseInt(id)))
    }, [dispatch, id]);
    console.log('CurrentPet', currentPet)

    const date = currentPet ? moment(currentPet).format('D MMMM, YYYY') : false;

    return (
        currentPet && (
            <div id="lostFullInfoBox">
                <div className="lfiHeader">
                    <span className="lfiHeaderTitle">
                       <b>{currentPet.status}</b> pet&nbsp;
                        <span className="lfiHeaderTitleNick">
                            {currentPet.type}&nbsp;
                        </span>
                        <span>
                            | <FontAwesomeIcon icon={faMapMarker} /> &nbsp;
                        </span>
                        <span className='grayColor'>{currentPet.location}</span> &nbsp;
                    </span>
                </div>

                <div className="lfiBody">
                    <div className="lfiBodyLeft">
                        <img
                            src={`http://localhost:5010/${currentPet.image}`}
                            alt="imgPhoto"
                        />
                    </div>
                    <div className="lfiBodyRight">
                        <div className="lfiBodyRightHeader">
                            <h3>
                                {currentPet.type}, {currentPet.breed}
                            </h3>
                            {currentPet.status === "lost" ? (
                                <p className="lfiBodyDate">{date}</p>
                            ) : (
                                <p className="lfiBodyDate">{date}</p>
                            )}

                        </div>
                        <div className='lfiBodyRightMiddle'>
                            <p>
                                <span>Color: </span>&nbsp;
                                {currentPet.color}
                            </p>
                            <p>
                                <span>Gender: </span>&nbsp;
                                {currentPet.sex}
                            </p>
                            <p>
                                <span>Height: </span>&nbsp;
                                {currentPet.height}
                            </p>
                            <br />
                            <br />
                            <p>
                                <span>Distinctive features: </span>&nbsp;
                                {currentPet.features}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="lfiDescription">
                    <span>Description: </span>&nbsp;
                    {currentPet.description}
                </div>
                <div className="lfiFooter">
                    <div>
                        <p>
                            <span>Owner:</span>&nbsp;&nbsp;
                            {currentPet.contacts.split(" ")[2]}{" "}
                            {currentPet.contacts.split(" ")[1]}
                        </p>
                        <p>
                            <span>Phone:</span>&nbsp;&nbsp;
                            {currentPet.contacts.split(" ")[0]}
                        </p>
                        <p>
                            <span>e-mail:</span>&nbsp;&nbsp;
                            {currentPet.contacts.split(" ")[3]}
                        </p>
                    </div>

                </div>
            </div>
        )
    );
}
export default FullInfoPet;

/*(
        currentPet && (
            <div className='lostFullInfoBox'>
                <div className='lostFIHeader'>
                    {currentPet.status}:
                    <p>{currentPet.nick} |
                        <span><FontAwesomeIcon icon={faMapMarker}/></span>
                        <span>{currentPet.location}</span></p>
                </div>
                <hr/>

            </div>
        )
    )*/
