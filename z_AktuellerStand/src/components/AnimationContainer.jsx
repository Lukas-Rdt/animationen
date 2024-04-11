import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { animations } from "./animations";
import { GraphicContainer } from "./GraphicContainer";
import { AnimationText } from "./AnimationText";
import { AnimationData } from "./AnimationData";

function AnimationContainer({ topicName }) {

  const animationDataContent = AnimationData[topicName];

  /**
   * 1 = title + graphic
   * 2 = move title up
   * 3 = loop with texts
   * 4 = remove all + increase progress
   */
  const [animationSelection, setAnimationSelection] = useState(0);
  // Progress in the module
  const [progress, setProgress] = useState(0);

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
      if (progress === 0 && animationSelection === 1) {
        explanationController.start({
          ...animations.show,
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            delay: 1.5
          }
        });
      }
      // TODO: that is correct here???
      if (animationSelection === 0 && progress !== 0) {
        setProgress((prevProgress) => prevProgress - 1);
      }
      nextAnimation("back");
      //backwardAnimations();
      //lastAnimation();
    } else if (event.key === "ArrowRight") {
      nextAnimation("next");
      explanationController.start(animations.hide);
      //forwardAnimation();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  })

  // WHEN BACK ANIMATION JUST DO ANIMATIONSELECTION - 1 
  /**
   * TEMPORARY SOLUTION FOR PRESENTATION - MIGHT BECOME PERMAMENT
   */
  const nextAnimation = async (direction) => {
    const animationPromises = [];
    let usedProgress = progress;
    let usedAnimationSelection;
    if (direction === "next") {
      console.log("\nCASE NEXT", 'color: blue; font-size: 20px;')
      console.log(animationDataContent.Content.length - 1);
      console.log(animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder[animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder.length - 1].length)
      if (usedProgress === animationDataContent.Content.length - 1 && animationSelection === animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder[animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder.length - 1].length) {
        return;
      }
      usedAnimationSelection = animationSelection;
    } else if (direction === "back" && animationSelection === 0) {
      console.log('%cCASE PROGRESS - 1', 'color: blue; font-size: 20px;');
      console.log("selection: ", usedAnimationSelection);
      usedAnimationSelection = animationDataContent.Content[usedProgress - 1].AnimationOrder.length - 1;
      console.log("after ne aplly: ", usedAnimationSelection);
      console.log("usedProgress - 1. order:");
      console.log(animationDataContent.Content[usedProgress - 1].AnimationOrder);
      setAnimationSelection(usedAnimationSelection);
      usedProgress = progress - 1;
      setProgress(usedProgress);
    } else {
      console.log("\n CASE DEAFULT SELECTION - 1", 'color: blue; font-size: 20px;');
      usedAnimationSelection = animationSelection - 1;
      setAnimationSelection(usedAnimationSelection);
    }
    console.log("now animation value used:");
    console.log(usedAnimationSelection);

    console.log("now used progress value:");
    console.log(usedProgress);

    const animationData = direction === "next" ? animationDataContent.Content[usedProgress].AnimationOrder[usedAnimationSelection] : animationDataContent.Content[usedProgress].AnimationOrderRev[usedAnimationSelection];


    console.log(animationDataContent.Content[usedProgress].AnimationOrder[usedAnimationSelection]);
    for (let i = 0; i < animationData.length; i++) {

      for (let j = 0; j < animationData[i].length; j++) {

        const animationEntry = animationData[i][j];
        const { element, speed } = animationEntry;
        const controller = elementToController[element];

        for (let k = 0; k < animationEntry.animationSelected.length; k++) {

          const animationSelected = animationEntry.animationSelected[k];

          // if animationSelection = 0 : erstes element speed = 0
          // if animationSelection = 0 and progress > 0 : nach dem umdrehen eigentlich letztes durchführen und dann den "ersten" klick, alles in einem

          if (animationSelected.includes(":")) {
            const stringParts = animationSelected.split(":");
            const animationMethod = stringParts[0];
            const animationValue = stringParts[1];

            // special cases where a parameter needs to be passed
            switch (animationMethod) {
              // special case if a anchor (top, right, bottom, left) needs to be removed for another to be in effect
              case "remove":
                animationPromises.push(controller.start({
                  ...animations.unset(animationValue),
                  transition: {
                    duration: speed,
                    ease: "easeInOut"
                  }
                }))
                break;
              case "color":
                animationPromises.push(controller.start({
                  ...animations.color(animationValue),
                  transition: {
                    duration: speed,
                    ease: "easeInOut"
                  }
                }))
                break;
              // TODO: collapse cases
              case "top":
                console.log('%cCASE TOP: ', 'font-size: 20px');
                console.log(animationValue);
                animationPromises.push(controller.start({
                  ...animations.top(animationValue),
                  transition: {
                    duration: speed,
                    ease: "easeInOut"
                  }
                }))
                break;
              case "right":
                break;
              default:
                break;
            }
          }

          animationPromises.push(controller.start({
            ...animations[animationSelected],
            transition: {
              duration: speed,
              ease: "easeInOut"
            }
          }))
        }
      }
      await Promise.all(animationPromises);
      console.log("animationen durchgeführt");
    }
    if (direction === "next") {
      const newSelect = animationSelection + 1;
      setAnimationSelection(newSelect);
    }
    if (direction === "next" && animationSelection === animationDataContent.Content[progress].AnimationOrder.length - 1) {
      setProgress((prevProgress) => prevProgress + 1);
      setAnimationSelection(0);
    }
  }

  useEffect(() => {
    console.log("useEffect:");
    console.log("Effect selection: ", animationSelection);
    console.log("Progress: ", progress);
  }, [animationSelection, progress])

  // assignment to animation controller
  const explanationController = useAnimation();
  const graphicController = useAnimation();
  const titleController = useAnimation();

  /* sure there is a better solution than this */
  const textControllers = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  const elementToController = {
    "image": graphicController,
    "text0": titleController,
    "text1": textControllers[0],
    "text2": textControllers[1],
    "text3": textControllers[2],
    "text4": textControllers[3]
  }

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
      <div style={{ position: "relative", width: "60%", maxWidth: "1000px", height: "563px", backgroundColor: "white", borderRadius: "20px", cursor: "pointer", overflow: "hidden" }}>

        <motion.div
          className="w-full, h-full flex justify-center"
          initial={{ visibility: "visible" }}
          animate={explanationController}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              textAlign: "center",
              fontSize: "calc(14px + 1vmin)",
              paddingTop: "30%",
            }}>
            Zurück
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "absolute",
              right: 0,
              top: 0,
              textAlign: "center",
              fontSize: "calc(14px + 1vmin)",
              paddingTop: "30%"
            }}>
            Weiter
          </div>

          <div
            style={{
              width: "80%",
              height: "50%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            Zum steuern der Animationen links oder rechts auf den Bereich klicken oder mit den Pfeiltasten links/rechts.
          </div>
        </motion.div>


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
          className="bg-black opacity-0 hover:opacity-5 duration-200"
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
          className="bg-black opacity-0 hover:opacity-5 duration-200"
          onClick={() => {
            handleKeyPress({ key: "ArrowRight" });
          }}></div>

        {/* Graphic Animation Container -- the style is for vertically centering, pos = absolute and left = 100% necessary to be out of parent */}
        <motion.div
          animate={graphicController}
          initial={{ position: "absolute", left: "100%" }}
          style={{ width: "50%", top: "50%", transform: "translateY(-50%)" }}>
          <GraphicContainer
            type={animationDataContent.Content[progress].Image.typeImg}
            src={animationDataContent.Content[progress].Image.src}
            altText={animationDataContent.Content[progress].Image.alt}
          />
        </motion.div>

        {/* Text Animation Container --  */}
        <motion.div
          className="title"
          animate={titleController}
          initial={{ position: "absolute", right: "100%" }}
          style={{ width: "50%" }}>
          <AnimationText typeText={animationDataContent.Content[progress].Texts[0].typeText} text={animationDataContent.Content[progress].Texts[0].string} />
        </motion.div>

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
          {animationDataContent.Content[progress].Texts.length >= 2 ? (
            <AnimationText typeText={animationDataContent.Content[progress].Texts[1].typeText} text={animationDataContent.Content[progress].Texts[1].string} />
          ) : null}
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
          {animationDataContent.Content[progress].Texts.length >= 3 ? (
            <AnimationText typeText={animationDataContent.Content[progress].Texts[2].typeText} text={animationDataContent.Content[progress].Texts[2].string} />
          ) : null}
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
          {animationDataContent.Content[progress].Texts.length >= 4 ? (
            <AnimationText typeText={animationDataContent.Content[progress].Texts[3].typeText} text={animationDataContent.Content[progress].Texts[3].string} />
          ) : null}
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
          {animationDataContent.Content[progress].Texts.length >= 5 ? (
            <AnimationText typeText={animationDataContent.Content[progress].Texts[4].typeText} text={animationDataContent.Content[progress].Texts[1].string} />
          ) : null}
        </motion.div>
      </div>
    </div>
    // anstatt null, default Text setzen, sie sind aber hiddens
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