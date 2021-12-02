import {
    paginationSelector,
    setCurrentPageAction,
} from "../../store/pagination";
import {useDispatch, useSelector} from "react-redux";
import {getServicesAction, serviceSelector} from "../../store/service";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Hotels from "./Hotels";
import Walking from "./Walking";
import Fostering from "./Fostering";
import VetHelp from "./VetHelp";
import './../../css/Services.css'

const Services = () => {
    const { currentPage, limit, pages } = useSelector(paginationSelector);
    const {
        services: { rows },
    } = useSelector(serviceSelector);
    const { type } = useParams();

    const pagesArr = (number) => {
        const res = [];
        for (let i = 1; i <= number; i++) res.push(i);
        return res;
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServicesAction(type, currentPage, limit));
    }, [dispatch, type, currentPage, limit]);

    return (
        <div>
            <div className="servicePagination">
               {/* {pagesArr(pages).map((item) => (
                    <p id={item}
                    onClick={(event) => {
                    dispatch(setCurrentPageAction(item));
                    event.target.classList.add("serviceActiveLink");
                    Array.from(event.target.parentNode.children).map(
                    (link) =>
                    event.target.id !== link.id
                    ? link.classList.remove(
                    "serviceActiveLink"
                    )
                    : ""
                    );
                }}
                    key={item}
                    >
                {item}

                    </p>
                ))}
            </div>
            {type === "Hotels" && <Hotels rows={rows} />}
            {type === "Walking" && <Walking rows={rows} />}
            {type === "Fostering" && <Fostering rows={rows} />}
            {type === "VetHelp" && <VetHelp rows={rows} />}*/}
        </div>
        </div>
    );
};

export default Services;