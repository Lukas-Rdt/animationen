import React, { useRef, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AppContext from "../AppContext";
import { ReactComponent as RightArrow } from "../../assets/images/right-arrow.svg";
import AnimationContainer from "../AnimationContainer";
import { TopicData } from "../TopicData";
import { TextData } from "../../TextData";

const SubTopicPage = () => {
  const { subtopicId } = useParams(); // get name of current subtopic
  const location = useLocation(); // get params from Link element
  const { clickedContent } = location.state || {}; // get clicked content from location state

  const topicContents = useContext(AppContext);
  const contentNames = Object.keys(topicContents[subtopicId]);
  const [hasSectionThree, setHasSectionThree] = useState(true);

  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [showToTopBtn, setShowToTopBtn] = useState(false);

  const isVideoAnimation = TopicData[subtopicId];
  const colors = ["#77a9d1", "#8377d1", "#c177d1", "#d177b3"];
  const [videoHeight, setVideoHeight] = useState(0);
  const [websiteHeight, setWebsiteHeight] = useState(0);
  const videoRef = useRef(null);
  const websiteRef = useRef(null);
  const textData = TextData[subtopicId];

  // scroll to specific content if it was clicked, or top of page
  useEffect(() => {
    if (!initialScrollDone) {
      // only use this scroll behavior initially
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
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    // save if there is a third section to state
    setHasSectionThree(contentNames.length >= 3);
  }, [
    clickedContent,
    subtopicId,
    topicContents,
    contentNames,
    initialScrollDone,
  ]);

  // only show toTopBtn if user scrolls 20px down
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setShowToTopBtn(true);
    } else {
      setShowToTopBtn(false);
    }
  };

  useEffect(() => {
    const calculateHeightVideo = () => {
      if (videoRef.current) {
        const width = videoRef.current.offsetWidth;
        const height = (width / 16) * 9;
        setVideoHeight(height);
      }
    };

    const calculateHeightWebsite = () => {
      if (websiteRef.current) {
        const width = websiteRef.current.offsetWidth;
        const height = (width / 16) * 9;
        setWebsiteHeight(height);
      }
    };

    const calculator = () => {
      calculateHeightVideo();
      calculateHeightWebsite();
    };
    calculator();
    window.addEventListener("resize", calculator);
    return () => {
      window.removeEventListener("resize", calculator);
    };
  }, []);

  return (
    <div className="SubTopicPage" style={subTopic_style}>
      <div id="top" className="h1 mt-10 mb-20">
        {subtopicId}
      </div>
      <div
        id="section1"
        style={{ ...section_style, background: "#77a9d1", minHeight: "75vh" }}>
        {isVideoAnimation.Video && (
          <iframe
            ref={videoRef}
            src={textData.VideoLink}
            title={"Einführungsvideo"}
            allowFullScreen
            style={{
              border: "0",
              height: `${videoHeight}px`,
              width: "60%",
              maxWidth: "1000px",
              margin: "100px",
              borderRadius: "20px",
            }}></iframe>
        )}
      </div>
      <div id="section2" style={{ ...section_style, background: "#8377d1" }}>
        <div className="h-full">
          <p className="h2 mb-10 mt-14 text-center">
            {textData.Texte[0].title}
          </p>
          <p className="text">
            {textData.Texte[0].texts.map((item, index) => {
                  if (item.startsWith('## ')) {
                    return (
                      <p className="mt-5 text-lg text-white" key={index}>
                        {item.slice(3)}
                      </p>
                    )
                  } else {
                    return (
                      <p className="text-white" key={index}>
                        {item}
                      </p>
                    )
                  }
                })}
          </p>
        </div>
        {isVideoAnimation.Animation && (
          <>
            <p className="h2 mb-10 mt-14">Beispiel interaktiver Inhalt</p>
            <AnimationContainer topicName={subtopicId} />
          </>
        )}
      </div>
      {hasSectionThree && (
        <div id="section3" style={{ ...section_style, background: "#c177d1" }}>
          {textData.Texte.length > 1 ? (
            <div className="h-full">
              <p className="h2 mb-10 mt-14 text-center">
                {textData.Texte[1].title}
              </p>
              <div className="text">
                {textData.Texte[1].texts.map((item, index) => {
                  if (item.startsWith('## ')) {
                    return (
                      <p className="mt-5 text-lg text-white" key={index}>
                        {item.slice(3)}
                      </p>
                    )
                  } else {
                    return (
                      <p className="text-white" key={index}>
                        {item}
                      </p>
                    )
                  }
                })}
              </div>
            </div>
          ) : null}
          {subtopicId === "Fazit" && (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}>
              <iframe
                ref={websiteRef}
                src={"https://tinobreier.github.io/dos-and-donts/#/interaktiv"}
                title={"Interaktive Website für dos and donts bei KI"}
                allowFullScreen
                style={{
                    border: "0",
                    height: `${websiteHeight}px`,
                    width: "80%",
                    maxWidth: "2000px",
                    margin: '100px',
                    borderRadius: "20px",
                }}></iframe>
                <iframe
                ref={websiteRef}
                src={"https://hkuswik.github.io/quiz_uxfuerki_ba/"}
                title={"Interaktive Website für Quizfragen für die UX von KI"}
                allowFullScreen
                style={{
                    border: "0",
                    height: `${websiteHeight}px`,
                    width: "80%",
                    maxWidth: "2000px",
                    margin: '100px',
                    borderRadius: "20px",
                }}></iframe>
            </div>
          )}
        </div>
      )}
      {showToTopBtn && <RightArrow onClick={scrollToTop} id="toTopBtn" />}
    </div>
  );
};

// scrolls to element by id
function scrollToElement(sectionId) {
  const elem = document.getElementById(sectionId);
  elem.scrollIntoView({ behavior: "smooth" });
}

// scrolls to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// styles
const subTopic_style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const section_style = {
  minHeight: "60vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default SubTopicPage;
