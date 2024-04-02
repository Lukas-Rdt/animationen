import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../AppContext';
import { ReactComponent as RightArrow } from '../../assets/images/right-arrow.svg';
import AnimationContainer from '../AnimationContainer';

const SubTopicPage = () => {
    const { subtopicId } = useParams(); // get name of current subtopic
    const location = useLocation(); // get params from Link element
    const { clickedContent } = location.state || {}; // get clicked content from location state

    const topicContents = useContext(AppContext);
    const contentNames = Object.keys(topicContents[subtopicId]);
    const [hasSectionThree, setHasSectionThree] = useState(true);

    const [videoContent, setVideoContent] = useState({ link: '', title: '' });
    const [sectionTwoText, setSectionTwoText] = useState('lorem ipsum :)');
    const [sectionThreeText, setSectionThreeText] = useState('lorem ipsum :)');

    const [initialScrollDone, setInitialScrollDone] = useState(false);
    const [showToTopBtn, setShowToTopBtn] = useState(false);

    // scroll to specific content if it was clicked, or top of page
    useEffect(() => {
        if (!initialScrollDone) { // only use this scroll behavior initially
            if (clickedContent !== undefined) {
                // get index of content to scroll to correct section
                const index = contentNames.indexOf(clickedContent);
                scrollToElement(`section${index + 1}`);
            } else {
                window.scrollTo(0, 0); // else just scroll to top of page
            }
            setInitialScrollDone(true);
        } else {
            // check scroll behavior for toTopBtn after initial scroll
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }

        // save if there is a third section to state
        setHasSectionThree(contentNames.length >= 3);
    }, [clickedContent, subtopicId, topicContents, contentNames, initialScrollDone]);

    // only show toTopBtn if user scrolls 20px down
    const handleScroll = () => {
        if (window.scrollY > 20) {
            setShowToTopBtn(true);
        } else {
            setShowToTopBtn(false);
        }
    };

    // set specific content according to subTopic
    useEffect(() => {
        setVideoContent(topicContents[subtopicId][contentNames[0]]);
        setSectionTwoText(topicContents[subtopicId][contentNames[1]]);
        hasSectionThree && setSectionThreeText(topicContents[subtopicId][contentNames[2]]);
        console.log("subtopicID: " + subtopicId);
    }, [subtopicId, topicContents, contentNames, hasSectionThree]);

    return (
        <div className='SubTopicPage' style={subTopic_style}>
            <div id="top" className='h1 mt-10 mb-20'>{subtopicId}</div>
            <div id="section1" style={{ ...section_style, background: '#77a9d1', minHeight: '75vh', }}>
                <p className='h2 mb-10 mt-14'>{contentNames[0]}</p>
                {/* 
                <iframe
                    src={videoContent.link}
                    title={videoContent.title} allowFullScreen
                    style={{ border: '0', height: '50vh', width: '60%', maxWidth: '900px', marginBottom: '100px' }}>
                </iframe>
                */}
                <AnimationContainer topicName={subtopicId} /> 
            </div>
            <div id="section2" style={{...section_style, background: '#8377d1'}}>
                <p className='h2 mb-10 mt-14'>{contentNames[1]}</p>
                <p className='text'>{sectionTwoText}</p>
            </div>
            {hasSectionThree &&
                <div id="section3" style={{ ...section_style, background: '#c177d1' }}>
                    <p className='h2 mb-10 mt-14'>{contentNames[2]}</p>
                    <p className='text'>{sectionThreeText}</p>
                </div>
            }
            {showToTopBtn && <RightArrow onClick={scrollToTop} id="toTopBtn" />}
        </div>
    );
};

// scrolls to element by id
function scrollToElement(sectionId) {
    const elem = document.getElementById(sectionId);
    elem.scrollIntoView({ behavior: 'smooth' });
};

// scrolls to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// styles
const subTopic_style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
const section_style = {
    minHeight: '60vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export default SubTopicPage;