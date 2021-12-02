import React from "react";
import homeIMG from './../img/home.jpg'
import {Link} from "react-router-dom";
import './../css/Home.css';
import HomePageFoundBtn from "./HomePageFoundBtn";
import HomePageLostBtn from "./HomePageLostBtn";
import Animals from './../img/02.jpg';
import LogoHeader from './../img/logo-white.svg'

export default function ContentHomePage(){
    return(
        <>
           <div className='contentHome'>
               <div className='headerContainer'>
                    <div className='leftHomePageContainer'>
                        <h1>Welcome to your <br/>
                        <span>pawfessional</span><br/>
                            community
                        </h1>
                        <HomePageLostBtn/>
                        <HomePageFoundBtn/>
                    </div>
                   <div className='rightHomePageContainer'>
                        <img src={homeIMG} alt='dogPicture'/>
                   </div>
               </div>
               <p className='joinLink'>I'm okay, jast want to <Link to='/signin'>JOIN</Link> the pawsome community!</p>
           </div>
           <div className='titleSection'>
               <h2>Our fluffy space for lovers, admirers, dads and moms <br/>
               of our four-legged, winged, tailed guys</h2>
           </div>
           <div className='contentSecondSection'>
               <div className='leftSecondSection'>
                   <img src={Animals}/>
               </div>
               <div className='rightSecondSection'>
                   <h3>Here is collected everything that your pet needs:</h3>
                   <ul className='secondSectionList'>
                       <li>professional veterinarian tips;</li>
                       <li>useful information about education and care;</li>
                       <li>information about pet-sitting and walking service;</li>
                       <li>and of course, great communication with new friends in your social network!</li>
                   </ul>
                   <p className='secondSectionP'>Make an account and <Link to='/signin'>JOIN</Link> to us!</p>
               </div>
           </div>
            <div className='secondSectionFooter'>
                <img src={LogoHeader} alt='logo'/>
                <p>Project 'ProPets' from Dinara, Alex, Illia<br/>© 2021</p>
            </div>
        </>
    )
}
