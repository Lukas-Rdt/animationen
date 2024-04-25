import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { animations } from "./animations";
import { GraphicContainer } from "./GraphicContainer";
import { AnimationText } from "./AnimationText";
import { AnimationData } from "./AnimationData";

function AnimationContainer({ topicName }) {

  const animationDataContent = AnimationData[topicName];

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

  // Could be removed
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
      //nextAnimation("back");
      console.log(animationDataContent)
    } else if (event.key === "ArrowRight") {
      nextAnimation("next");
      explanationController.start(animations.hide);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  })

  const nextAnimation = async (direction) => {
    const animationPromises = [];
    let usedProgress = progress;
    let usedAnimationSelection;
    if (direction === "next") {
      // es war (eigentlich falsch, ging auch nicht mehr woanders): animationSelection === animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder[animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder.length - 1].length
      if (usedProgress === animationDataContent.Content.length - 1 && animationSelection === animationDataContent.Content[animationDataContent.Content.length - 1].AnimationOrder.length - 1) {
        return;
      }
      usedAnimationSelection = animationSelection;
    } else if (direction === "back" && animationSelection === 0) {
      usedAnimationSelection = animationDataContent.Content[usedProgress - 1].AnimationOrder.length - 1;
      setAnimationSelection(usedAnimationSelection);
      usedProgress = progress - 1;
      setProgress(usedProgress);
    } else {
      usedAnimationSelection = animationSelection - 1;
      setAnimationSelection(usedAnimationSelection);
    }

    // gets next or last animation
    const animationData = direction === "next" ? animationDataContent.Content[usedProgress].AnimationOrder[usedAnimationSelection] : animationDataContent.Content[usedProgress].AnimationOrderRev[usedAnimationSelection];

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
            const animationValue = stringParts.slice(1).join(":");
            console.log("danach: " + animationValue);

            // special cases where a parameter needs to be passed
            switch (animationMethod) {
              // special case if a anchor (top, right, bottom, left) needs to be removed for another to be in effect
              case "remove":
                console.log("case remove");
                animationPromises.push(controller.start({
                  ...animations.unset(animationValue),
                  transition: {
                    duration: speed,
                    ease: "easeInOut"
                  }
                }))
                break;
              case "color":
                console.log("case color");
                animationPromises.push(controller.start({
                  ...animations.color(animationValue),
                  transition: {
                    duration: speed,
                    ease: "easeInOut"
                  }
                }))
                break;
              case "move":
                console.log("case move");
                const moveParts = animationValue.split(":");
                const direction = moveParts[0];
                const moveValue = moveParts[1];
                console.log("direction: " + direction);
                console.log("moveValue: " + moveValue);
                animationPromises.push(controller.start({
                  ...animations.move(direction, moveValue),
                  transition: {
                    duration: speed,
                    ease: "easeInOut"
                  }
                }))
                break;
              default:
                break;
            }
          } else {
            console.log("default case: " + animationSelected);
            animationPromises.push(controller.start({
              ...animations[animationSelected],
              transition: {
                duration: speed,
                ease: "easeInOut"
              }
            }))
          }
        }
      }
      await Promise.all(animationPromises);
    }
    if (direction === "next") {
      const newSelect = animationSelection + 1;
      console.log("is next selection now");
      setAnimationSelection(newSelect);
    }
    if (direction === "next" && animationSelection === animationDataContent.Content[progress].AnimationOrder.length - 1) {
      setProgress((prevProgress) => prevProgress + 1);
      setAnimationSelection(0);
      // FIXME: find a way to resolve
      // recursive here brings error: cant read image, text, ... 
      //nextAnimation("next");
    }
  }

  useEffect(() => {
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