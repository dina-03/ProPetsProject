import './../css/ModalFooter.css'
import {Link} from "react-router-dom";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const ModalFooter=({currentForm})=>{
    return(
            <div className='modalFooter'>

            <Link to='/'><button className='btnCancel' name='cancel'>Cancel</button></Link>
                {currentForm ?
                    <Button className='btnSubmit' name='submit' icon={faPaw} text='Login'/>:
                    <Button className='btnSubmit' name='reg' icon={faPaw}  text={'Submit'}/>
                }
            </div>
    )
}
export default ModalFooter;

