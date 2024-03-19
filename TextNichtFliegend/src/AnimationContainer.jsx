/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, useAnimation } from "framer-motion";
import { animations } from "./animations";
import Title from "./Title";
import { GraphicContainer } from "./GraphicContainer";
import { Text } from "./Text";

function AnimationContainer({ titleList, imageList, textList }) {
  /**
   * 1 = title + graphic
   * 2 = move title up
   * 3 = loop with texts
   * 4 = remove all + increase progress
   */
  const [animationSelection, setAnimationSelection] = useState(1);
  const [textProgress, setTextProgress] = useState(0);
  // Progress in the module
  const [progress, setProgress] = useState(0);
  const [lastProgress, setLastProgress] = useState(0);

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
      if (animationSelection == 1 && progress != 0) {
        setLastProgress(progress);
        setProgress((prevProgress) => prevProgress - 1);
      }
      backwardAnimations();
    } else if (event.key === "ArrowRight") {
      forwardAnimation();
    }
  };

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
        if (textProgress >= 0 && textProgress < textList[progress].length) {
          console.log(textTopValuesMove[textProgress]);
          textControllers[textProgress].start(animations.textOp);
          console.log(textTopValuesMove[textProgress]);
          if (textProgress === textList[progress].length - 1) {
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
        setProgress((prevProgress) => prevProgress + 1);
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
        if (progress == 0 && lastProgress == 0) {
          return;
        }
        //setProgress(prevProgress => prevProgress - 1);
        updateYValues();

        // texte von außen reinfliegen lassen
        setTextProgress(textList[progress].length);
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
          ...textList[progress - 1].map((_, i) => {
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
        if (textProgress == 0) {
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
        textControllers[textList[progress].length - 1].start(
          animations.resetTextOp
        );
        setTextProgress(textList[progress].length - 1);
        setAnimationSelection(3);
        break;
      default:
        break;
    }
  };

  // assignment to animation controller
  const graphicController = useAnimation();
  const titleController = useAnimation();

  {
    /* sure there is a better solution than this */
  }
  const textControllers = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  // temporary controls for moving the animations
  /*
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  */

  // Calculate the correct top values for the text elements
  const updateYValues = () => {
    // pos for text one
    const title = document.getElementsByClassName("title");
    const titleElement = title[0];
    const titleHeight = titleElement.offsetHeight;
    updateTextTopValues(0, `calc(20% + ${titleHeight}px + 50px)`);

    // text two pos
    const textOne = document.getElementsByClassName("textOne");
    const firstTextElement = textOne[0];
    const textOneHeight = firstTextElement.offsetHeight;
    updateTextTopValues(
      1,
      `calc(20% + ${titleHeight}px + ${textOneHeight}px + 100px)`
    );

    // text three pos
    const textTwo = document.getElementsByClassName("textThree");
    const secondTextElement = textTwo[0];
    const textTwoHeight = secondTextElement.offsetHeight;
    updateTextTopValues(
      2,
      `calc(20% + ${titleHeight}px + ${textOneHeight}px + ${textTwoHeight}px + 150px)`
    );

    // text four pos
    const textThree = document.getElementsByClassName("textFour");
    const thirdTextElement = textThree[0];
    const textThreeHeight = thirdTextElement.offsetHeight;
    updateTextTopValues(
      3,
      `calc(20% + ${titleHeight}px + ${textOneHeight}px + ${textTwoHeight}px + ${textThreeHeight}px + 200px)`
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
          width: "80%",
          height: "80%",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}>
        {/* Steurung über den Bidlschirm */}
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
            backgroundColor: "rgba(173, 216, 230, 0.3)",
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
            backgroundColor: "rgba(144, 238, 144, 0.3)",
          }}
          onClick={() => {
            handleKeyPress({ key: "ArrowRight" });
          }}></div>

        {/* Graphic Animation Container -- the style is for vertically centering, pos = absolute and left = 100% necessary to be out of parent */}
        <motion.div
          animate={graphicController}
          initial={{ position: "absolute", left: "100%" }}
          style={{ width: "50%", top: "50%", transform: "translateY(-50%)" }}>
          <GraphicContainer
            type={imageList[progress].type}
            src={imageList[progress].src}
            altText={imageList[progress].alt}
          />
        </motion.div>

        {/* Title Animation Container --  */}
        <motion.div
          className="title"
          animate={titleController}
          initial={{ position: "absolute", right: "100%" }}
          style={{ width: "50%", top: "50%", transform: "translateY(-50%)" }}>
          <Title titleText={titleList[progress]} />
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
          <Text text={textList[progress][0]} />
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
          <Text text={textList[progress][1]} />
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
          <Text text={"text x y was weiß ich"} />
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
          <Text text={"text hundert 2"} />
        </motion.div>
      </div>
  );
}


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
export default AnimationContainer;