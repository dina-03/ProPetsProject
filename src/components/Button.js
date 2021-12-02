import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './../css/Buttons.css'

export default function Button({text, ...rest}) {
    const {name, icon, click, params, color} = rest;
    return (
        <>
            <button name={name} onClick={click && (params ? (() => click(...params)) : (() => click()))}
                    className={`btnSubmit ${color}`} style={{
                        color:(color==='btnLost' || color==='btnFound')
            }}>
                {icon && <FontAwesomeIcon name='btnIcon' icon={icon}/>}&nbsp;&nbsp;
                {text}
            </button>
        </>
    )
}