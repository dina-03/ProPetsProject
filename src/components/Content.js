import {Route, Switch} from "react-router-dom";
import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import './../css/Content.css'
import UserProfile from "./UserProfile";
import Pets from "./Pets/Pets";
import PostFullInfo from "./Posts/PostFullInfo";
import Posts from "./Posts/Posts";
import AddPostLost from "./Pets/AddPostLost";
import FullInfoPet from "./Pets/FullInfoPet";
import AddPetFound from "./Pets/AddPetFound";
import AddPost from "./Posts/AddPost";
import AddService from "./service/AddService";
import FullInfoService from "./service/FullInfoService";
import Services from "./service/Services";

const Content=()=>{
    return(
        <div className='content'>
            <Switch>
                <Route path='/postFullInfo/:id' component={PostFullInfo}/>
                <Route path='/lost/add' component={AddPostLost}/>
                <Route path='/found/add' component={AddPetFound}/>
                <Route path='/lost' component={Pets}/>
                <Route path='/found' component={Pets}/>
                <Route path='/pet/:id' component={FullInfoPet}/>
                <Route path='/leftSide' component={LeftSide}/>
                <Route path='/rightSide' component={RightSide}/>
                <Route path='/service/add' component={AddService}/>
                <Route path='/service/type' component={Services}/>
                <Route path='/profile' component={UserProfile}/>
                <Route path='/posts/add' component={AddPost}/>
                <Route path='/posts' component={Posts}/>
            </Switch>
        </div>
    )
}
export default Content;
/*<Route path='/service/:id' component={FullInfoService}/>*/
