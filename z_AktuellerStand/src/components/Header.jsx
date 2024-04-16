import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as RightArrow } from '../assets/images/right-arrow.svg';
import wegweiserLogo from '../assets/images/Wegweiser_logo.png';

const Header = () => {
    const location = useLocation(); // get currently active path
    const encodedTopicName = location.pathname.split("/")[2]; // extract topic name from encoded pathname
    const topicName = decodeURIComponent(encodedTopicName); // decode to prevent errors when using 'üöä'

    return (
        <div className='Header flex pt-3 pl-1 items-center'>
            <div className='img-container w-16 ml-2 mr-2'>
                <Link to="/">
                    <img src={wegweiserLogo} alt="Wegweiser.UX-für-KI Logo" />
                </Link>
            </div>
            <Link to="/" className='h3 hover:underline mr-3'>Kursübersicht</Link>
            <RightArrow className='h-3 w-5 mr-3' style={{ fill: '#21202b' }} />
            <Link to="/" className='h3 hover:underline'>Der EU AI Act</Link>
            {topicName !== "undefined" && (
                <div className='flex items-center ml-3'>
                    <RightArrow className='h-3 w-5 mr-3' style={{ fill: '#21202b' }} />
                    <Link to={location.pathname} className='h3 hover:underline'>{topicName}</Link>
                </div>
            )}
        </div>
    );
};

export default Header;