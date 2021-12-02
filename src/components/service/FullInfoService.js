import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getServiceAction, serviceSelector} from "../../store/service";
import moment from "moment";
import {useEffect} from "react";

const ServiceFullInfo = () => {

    const {currentService} = useSelector(serviceSelector)

    const {id} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServiceAction(parseInt(id)))
    }, [dispatch, id])

    const date = currentService && moment(currentService.date).format("D MMMM, HH:mm")

    return  (
        <div className="service-full-info">
            <h2>Full Info Service</h2>
        </div>
    );
};

export default ServiceFullInfo;