import { useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import { Link } from "react-router-dom";
import exampleImg from '../assets/images/exampleImg.gif';

const SubTopic = ({ topicName }) => {
    const topicContents = useContext(AppContext);
    const [contentNames, setContentNames] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setContentNames(Object.keys(topicContents[topicName]));
    }, [topicName, topicContents]);

    return (
        <div style={subTopic_style}>
            <Link to={`subtopic/${topicName}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="img-container h-24 w-full" style={{ background: '#817c9c', borderRadius: '10px 10px 0px 0px' }}>
                    <img src={exampleImg} alt="img-placeholder" />
                </div>
                <div className='h2 m-5 self-start cursor-pointer' style={{ color: isHovered ? '#d177b3' : '#21202b' }}>{topicName}</div>
            </Link>
            {contentNames.map((content, index) => (
                <Link to={`subtopic/${topicName}`} state={{ clickedContent: content }} key={index} className='h4 arrow-btn'>
                    {content}
                    <span className='arrow'></span>
                </Link>
            ))}
        </div >
    );
};

// styles
const subTopic_style = {
    background: 'white',
    width: '320px',
    height: '400px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    margin: '20px'
};

export default SubTopic;