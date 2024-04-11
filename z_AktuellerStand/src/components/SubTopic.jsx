import { useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import { Link } from "react-router-dom";

const SubTopic = ({ topicName, image }) => {
    const topicContents = useContext(AppContext);
    const [contentNames, setContentNames] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setContentNames(Object.keys(topicContents[topicName]));
    }, [topicName, topicContents]);

    return (
        <div style={subTopic_style}>
            <Link to={`subtopic/${topicName}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="img-container h-32 w-full mb-5" style={{ borderRadius: '10px 10px 0px 0px', padding: '0px 33px' }}>
                    <div className='h2 absolute mt-20 -ml-1 cursor-pointer' style={{color: isHovered ? '#d177b3' : '#21202b'}}>{topicName}</div>
                    <img src={image} className='opacity-50' alt="img-placeholder" />
                </div>
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