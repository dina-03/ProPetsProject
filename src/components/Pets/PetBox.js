import '../../css/Pets.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarker, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const PetBox = ({pet, index}) => {
    const nickName = pet.nick && pet.nick !== 'null' ? pet.type : 'Nickname';

    return (
        <div className='lostBoxContainer'>
        <div className='lostBox'>
            <div className='lostHeader'>
                <div className='lostNick'>
                    {pet.status === 'lost' ? nickName : pet.type}
                </div>
                <div className='lostAddress'>
                    <span><FontAwesomeIcon icon={faMapMarker}/> </span>
                    <p>{pet.location}</p>
                </div>
            </div>
            <div className='lostContainer'>
                <img src={`http://localhost:5010/${pet.image}`} alt='pet'/>
            </div>
            <div className='lostFooter'>
                <Link to={`/pet/${index}`}>view details <span>
                <FontAwesomeIcon icon={faChevronRight}/>
                <FontAwesomeIcon icon={faChevronRight}/>
            </span></Link>
            </div>
        </div>
        </div>
    )
}
export default PetBox;