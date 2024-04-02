import React, { useContext, useEffect, useState } from 'react';
import SubTopic from '../SubTopic';
import AppContext from '../AppContext';
import { ReactComponent as RightArrow } from '../../assets/images/right-arrow.svg';

const MainPage = () => {
    const topicContents = useContext(AppContext);
    const topicNames = Object.keys(topicContents);

    const [showToTopBtn, setShowToTopBtn] = useState(false);

    // check scroll behavior for toTopBtn
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // only show toTopBtn if user scrolls 20px down
    const handleScroll = () => {
        if (window.scrollY > 20) {
            setShowToTopBtn(true);
        } else {
            setShowToTopBtn(false);
        }
    };

    return (
        <div className='Mainpage flex flex-col items-center'>
            <div className='self-center h1 mt-20 mb-20'>Der EU AI Act</div>
            <div className='mb-20' style={item_row}>
                <SubTopic topicName={topicNames[0]} />
                <SubTopic topicName={topicNames[1]} />
                <SubTopic topicName={topicNames[2]} />
                <SubTopic topicName={topicNames[3]} />
            </div>
            {showToTopBtn && <RightArrow onClick={scrollToTop} id="toTopBtn" />}
        </div>
    );
};

// scrolls to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// styles
const item_row = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1000px'
};

export default MainPage;