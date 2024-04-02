import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { animations } from "./animations";
import { GraphicContainer } from "./GraphicContainer";
import { AnimationTitle } from "./AnimationTitle";
import { AnimationText } from "./AnimationText";
import exampleImg from '../assets/images/exampleImg.gif';
import { AnimationData } from "./AnimationData";

function AnimationContainer({ topicName }) {

    /* { titleList, imageList, textList } -- prop */
    const titleList = [
        "Ein zentrales Werkzeug",
        "1. minimales Risiko",
        "2. begrenztes Risiko",
        "3. hohes Risiko",
        "4. Inakzeptables Risiko",
        "Ein kleines Fazit",
        "Herzlichen Dank!",
      ];

      const imageList = [
        { type: "image", src: exampleImg, alt: "Bild 1" },
        { type: "image", src: exampleImg, alt: "Bild 2" },
        { type: "image", src: exampleImg, alt: "Bild 4" },
      ];
    
      const textList = [
        [
          "Progress: 1, Text: 1, das ist ein deutlich längerer text. Dieser Text ist sehr lang sehr sehr lang. Progress: 1, Text: 1, das ist ein deutlich längerer text. Dieser Text ist sehr lang sehr sehr lang.",
          "Progress: 1, Text: 2",
          "Progress: 1, Text: 3",
        ],
        [
          "Progress: 2, Text: 1",
          "Progress: 2, Text: 2",
          "Progress: 2, Text: 3",
          "Progress: 2, Text: 4",
        ],
        ["Progress: 3, Text: 1", "Progress: 3, Text: 2", "Progress: 3, Text: 3"],
      ];

  const [titles, setTitles] = useState([]);
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if (topicName in AnimationData) {
      //const { Titel, Bilder, Stichpunkte } = AnimationData[topicName];
      setTitles(AnimationData[topicName].Titel);
      setImages(AnimationData[topicName].Bilder);
      setTexts(AnimationData[topicName].Stichpunkte);
    }
  }, [topicName])

  useEffect(() => {
    console.log("Titel: " + titles);
    console.log("Images: " + images);
    console.log("Texts: " + texts);
  }, [titles, images, texts])

  /**
   * 1 = title + graphic
   * 2 = move title up
   * 3 = loop with texts
   * 4 = remove all + increase progress
   */
  const [animationSelection, setAnimationSelection] = useState(1);
  // progress of the text appearance
  const [textProgress, setTextProgress] = useState(0);
  // Progress in the module
  const [progress, setProgress] = useState(0);
  // last Progress in module
  const [lastProgress, setLastProgress] = useState(0);

  // top values for the positioning
  const [textTopValuesMove, setTextTopValuesMove] = useState([
    `calc(50% - 100px)`,
    `calc(40% + 50px)`,
    `calc(40% + 100px)`,
    `calc(40% + 150px)`,
  ]);

  // Case 2 adds current top values if not there already
  const [textValuesHistory, setTextValuesHistory] = useState([]);

  const updateTextTopValues = (index, newValue) => {
    setTextTopValuesMove((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

  // handles the correct animation
  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      if (animationSelection === 1 && progress !== 0) {
        setLastProgress(progress);
        setProgress((prevProgress) => prevProgress - 1);
      }
      backwardAnimations();
    } else if (event.key === "ArrowRight") {
      forwardAnimation();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  })

  const addExistingTopValues = () => {
    if (textValuesHistory[progress] === undefined) {
      setTextValuesHistory((prevArray) => [...prevArray, textTopValuesMove]);
    }
  };

  const forwardAnimation = async () => {
    switch (animationSelection) {
      case 1:
        updateYValues();
        await Promise.all([
          graphicController.start(animations.rightGraphicIn),
          titleController.start(animations.leftTitleIn),
          textControllers.map(controller => controller.start(animations.leftTitleIn))
        ]);
        setAnimationSelection(2);
        break;
      case 2:
        console.log("case 2 textprogress: " + textProgress);
        addExistingTopValues();
        await titleController.start(animations.leftTitleUp);
        textControllers.forEach((controller, i) => {
          controller.start(animations.hiddenTextReset(textTopValuesMove[i]));
          console.log(textTopValuesMove[i]);
        });
        setAnimationSelection(3);
        break;
      case 3:
        console.log("textprogress: " + textProgress);
        if (textProgress >= 0 && textProgress < texts[progress].length) {
          console.log(textTopValuesMove[textProgress]);
          textControllers[textProgress].start(animations.textOp);
          console.log(textTopValuesMove[textProgress]);
          if (textProgress === texts[progress].length - 1) {
            setAnimationSelection(4);
            // Reset for text progress
            setTextProgress(0);
          } else {
            setTextProgress(textProgress + 1);
          }
        } else {
          setAnimationSelection(4);
          // Reset for text progress
          setTextProgress(0);
        }
        break;
      case 4:
        setTextProgress(0);
        await Promise.all([
          graphicController.start(animations.rightGraphicOut),
          titleController.start(animations.leftTitleOut),
          textControllers.map(controller => controller.start(animations.leftTextOut))
        ]);
        await Promise.all([
          titleController.start(animations.hiddenTitleReset),
          textControllers.map(controller => controller.start(animations.setTextsHidden))
        ]);
        textControllers.forEach((controller, i) => {
          controller.start(animations.setTextsHidden);
        });
        setAnimationSelection(1);
        setLastProgress(progress);
        // move to useState when starting component
        const minLegnth = Math.min(titles.length, images.length, texts.length);
        if (progress < minLegnth - 1) {
          setProgress((prevProgress) => prevProgress + 1);
        }
        break;
      default:
        console.log("Error: Unknown animation selection");
        setProgress(1);
        break;
    }
  };

  const backwardAnimations = async () => {
    switch (animationSelection) {
      case 1:
        if (progress === 0 && lastProgress === 0) {
          return;
        }
        //setProgress(prevProgress => prevProgress - 1);
        updateYValues();

        // texte von außen reinfliegen lassen
        setTextProgress(texts[progress].length);
        titleController.start(animations.hiddenTitleSetUp);
        /*
        textControllers.forEach((controller, i) => {
          controller.start(animations.hiddenTextReset(textTopValuesMove[i]));
          console.log(textTopValuesMove[i]);
        })
        */
        setNewTextTops();
        await Promise.all([
          graphicController.start(animations.rightGraphicIn),
          titleController.start(animations.leftTitleIn),
          textControllers.forEach((controller) => {
            controller.start(animations.leftTextIn);
          }),
          ...texts[progress - 1].map((_, i) => {
            textControllers[i].start(animations.hiddenTextOp);
          }),
        ]);
        console.log("Progress: " + progress);
        setLastProgress(0);
        setAnimationSelection(4);
        break;
      case 2:
        await Promise.all([
          graphicController.start(animations.rightGraphicOut),
          titleController.start(animations.leftTitleOut),
          // text outside so they can fly in afterwards
          textControllers.map(controller => controller.start(animations.leftTextOut))
        ]);
        //setProgress(prevProgress => prevProgress - 1);
        setAnimationSelection(1);
        break;
      case 3:
        if (textProgress === 0) {
          await titleController.start(animations.resetTitleMid);
          console.log("reset title mid");
          setAnimationSelection(2);
        } else {
          textControllers[textProgress - 1].start(animations.resetTextOp);
          setTextProgress(textProgress - 1);
        }
        break;
      case 4:
        // auf text progress textlist length zurück
        textControllers[texts[progress].length - 1].start(
          animations.resetTextOp
        );
        setTextProgress(texts[progress].length - 1);
        setAnimationSelection(3);
        break;
      default:
        break;
    }
  };

  // assignment to animation controller
  const graphicController = useAnimation();
  const titleController = useAnimation();

  /* sure there is a better solution than this */
  const textControllers = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  // Calculate the correct top values for the text elements
  const updateYValues = () => {
    // pos for text one
    const title = document.getElementsByClassName("title");
    const titleElement = title[0];
    const titleHeight = titleElement.offsetHeight / 2;
    updateTextTopValues(0, `calc(20% + ${titleHeight}px + 10px)`);

    // text two pos
    const textOne = document.getElementsByClassName("textOne");
    const firstTextElement = textOne[0];
    const textOneHeight = firstTextElement.offsetHeight;
    updateTextTopValues(
      1,
      `calc(20% + ${titleHeight}px + ${textOneHeight}px + 20px)`
    );

    // text three pos
    const textTwo = document.getElementsByClassName("textThree");
    const secondTextElement = textTwo[0];
    const textTwoHeight = secondTextElement.offsetHeight;
    updateTextTopValues(
      2,
      `calc(20% + ${titleHeight}px + ${textOneHeight}px + ${textTwoHeight}px + 30px)`
    );

    // text four pos
    const textThree = document.getElementsByClassName("textFour");
    const thirdTextElement = textThree[0];
    const textThreeHeight = thirdTextElement.offsetHeight;
    updateTextTopValues(
      3,
      `calc(20% + ${titleHeight}px + ${textOneHeight}px + ${textTwoHeight}px + ${textThreeHeight}px + 40px)`
    );
    console.log("All top positions updated - theoratically");
  };

  const setNewTextTops = () => {
    textControllers.forEach((controller, i) => {
      controller.start(
        animations.hiddenTextReset(textValuesHistory[progress - 1][i])
      );
      console.log(textTopValuesMove[i]);
    });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: "100px"
      }}>
        <div style={{ position: "relative", width: "1000px", height: "563px", backgroundColor: "white", borderRadius: "20px", 
        overflow: "hidden",}}>

      {/* Steurung über den Bidlschirm */}
      <div
        style={{
          width: "50%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
        }}
        onClick={() => {
          handleKeyPress({ key: "ArrowLeft" });
        }}></div>

      <div
        style={{
          width: "50%",
          height: "100%",
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 1,
        }}
        onClick={() => {
          handleKeyPress({ key: "ArrowRight" });
        }}></div>

      {/* Graphic Animation Container -- the style is for vertically centering, pos = absolute and left = 100% necessary to be out of parent */}
      <motion.div
        animate={graphicController}
        initial={{ position: "absolute", left: "100%" }}
        style={{ width: "50%", top: "50%", transform: "translateY(-50%)" }}>
          {images != null ? (
            <GraphicContainer
            type={imageList[progress].type}
            src={imageList[progress].src}
            altText={imageList[progress].alt}
            />
            ) : <div></div>}
      </motion.div>

      {/* Title Animation Container --  */}
      <motion.div
        className="title"
        animate={titleController}
        initial={{ position: "absolute", right: "100%" }}
        style={{ width: "50%", top: "50%", transform: "translateY(-50%)" }}>
        <AnimationTitle titleText={titleList[progress]} />
      </motion.div>

      {/* Text Animation Containers */}
      <motion.div
        className="textOne"
        animate={textControllers[0]}
        initial={{
          position: "absolute",
          opacity: 0,
          right: "50%",
          top: textTopValuesMove[0],
        }}
        style={{ width: "50%" }}>
        <AnimationText text={textList[progress][0]} />
      </motion.div>

      <motion.div
        className="textTwo"
        animate={textControllers[1]}
        initial={{
          position: "absolute",
          opacity: 0,
          right: "50%",
          top: textTopValuesMove[1],
        }}
        style={{ width: "50%" }}>
        <AnimationText text={textList[progress][1]} />
      </motion.div>

      <motion.div
        className="textThree"
        animate={textControllers[2]}
        initial={{
          position: "absolute",
          opacity: 0,
          right: "50%",
          top: textTopValuesMove[2],
        }}
        style={{ width: "50%" }}>
        <AnimationText text={textList[progress][2]} />
      </motion.div>

      <motion.div
        className="textFour"
        animate={textControllers[3]}
        initial={{
          position: "absolute",
          opacity: 0,
          right: "50%",
          top: textTopValuesMove[3],
        }}
        style={{ width: "50%" }}>
        <AnimationText text={textList[progress][3]} />
      </motion.div>
      </div>
    </div>
  );
}
/*
AnimationContainer.propTypes = {
    titleList: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageList: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
        ).isRequired,
        textList: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.string)
            ).isRequired,
};
*/
export default AnimationContainer;