import './css/App.css';
import {useDispatch, useSelector} from "react-redux";
import {appSelector} from "./store/app";
import {useEffect} from "react";
import Home from "./components/Home";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import ContentHomePage from "./components/ContentHomePage";
import Loader from './components/Loader';
import HeaderHomePage from "./components/HeaderHomePage";
import ModalWindow from "./components/ModalWindow";
import {checkAuthAction, errorSelector} from "./store/auth";

function App() {

    const {loading, auth} = useSelector(appSelector);
    const dispatch = useDispatch();
    const error = useSelector(errorSelector);
    const {pathname} = useLocation();


    useEffect(() => {
        dispatch(checkAuthAction())
    }, [dispatch])

    return (
        <>
            <HeaderHomePage/>
            <Switch>
                <Route exact path='/' component={ContentHomePage}/>
                <Route path='/signin' component={ModalWindow}/>
            </Switch>
            {(auth || pathname ==='/lost' || pathname === '/found' || pathname.startsWith('/pet/')) && <Home/>}
            {loading && <Loader/>}
            {auth ? <Redirect exact from='/' to='posts'/> : <Redirect to='/'/>}
            {error === 'Not authorized' && <Redirect to={`/`}/>}
        </>
    );
}

export default App;


