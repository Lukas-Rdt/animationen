import React, { useContext, useEffect, useState } from 'react';
import SubTopic from '../SubTopic';
import AppContext from '../AppContext';
import { ReactComponent as RightArrow } from '../../assets/images/right-arrow.svg';
import imageNr1 from '../../assets/images/Element1.png';
import imageNr2 from '../../assets/images/Element2.png';
import imageNr3 from '../../assets/images/Element3.png';
import imageNr4 from '../../assets/images/Element4.png';

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
            <div className='self-center h1 mt-20 mb-20'>Wegweiser UX für KI</div>
            <div className='mb-20' style={item_row}>
                <SubTopic topicName={topicNames[0]} image={imageNr1} />
                <SubTopic topicName={topicNames[1]} image={imageNr2} />
                <SubTopic topicName={topicNames[2]} image={imageNr3} />
                <SubTopic topicName={topicNames[3]} image={imageNr4} />
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