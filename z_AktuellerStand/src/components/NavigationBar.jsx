import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <div className='Nav fixed bottom-0 top-0 flex justify-center p-5'>
            <div className='flex flex-col justify-center w-3/5'>
                <Link className='nav-btn'>Thema 1</Link>
                <Link to="/" className='nav-btn'>Der EU AI Act</Link>
                <Link className='nav-btn'>Thema 3</Link>
                <Link className='nav-btn'>Thema 4</Link>
            </div>
        </div>
    );
};

export default NavigationBar;