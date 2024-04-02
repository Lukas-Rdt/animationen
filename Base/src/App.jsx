/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { animations } from "./animations";
import Title from "./Title";
import { GraphicContainer } from "./GraphicContainer";
import { Text } from "./Text";
// import images in module "parent"
import bild1 from "./assets/Bild1.gif";
import bild2 from "./assets/Bild2.gif";

function App() {
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

  const [textTopValuesMove, setTextTopValuesMove] = useState([
    `calc(50% - 100px)`, `calc(40% + 50px)`, `calc(40% + 100px)`, `calc(40% + 150px)`
  ]);

  const [textTopBaseValues, setTextTopBaseValues] = useState([
    "50%", `calc(50% + 50px)`, `calc(50% + 100px)`, `calc(50% + 150px)`
  ]);

  const updateTextTopValues = (index, newValue) => {
    setTextTopValuesMove(prevState => {
      const updatedValues = [...prevState];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

  const updateTextBaseTopValues = (index, newValue) => {
    setTextTopBaseValues(prevState => {
      const updatedValues = [...prevState];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

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
    { type: "image", src: bild1, alt: "Bild 1" },
    { type: "image", src: bild2, alt: "Bild 2" },
    { type: "image", src: bild2, alt: "Bild 4" },
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

  // handles the correct animation
  const handleKeyPress = (event) => {
    updateYValues();
    if (event.key === "ArrowLeft") {
      console.log("left arrow key");
    } else if (event.key === "ArrowRight") {
      console.log("right arrow key");
      forwardAnimation();
    }
  };

  const forwardAnimation = async () => {
    switch (animationSelection) {
      case 1:
        await Promise.all([
          graphicController.start(animations.rightGraphicIn),
          titleController.start(animations.leftTitleIn),
        ]);
        textControllers.forEach((controller, i) => {
          controller.start(animations.hiddenTextReset(textTopBaseValues[i]));
          console.log(textTopBaseValues[i]);
        })
        setAnimationSelection(2);
        break;
      case 2:
        await titleController.start(animations.leftTitleUp);
        textControllers.forEach((controller, i) => {
          controller.start(animations.hiddenTextReset(textTopBaseValues[i]));
          console.log(textTopBaseValues[i]);
        })
        setAnimationSelection(3);
        break;
      case 3:
        console.log("textprogress: " + textProgress);
        if (textProgress >= 0 && textProgress < textList[progress].length) {
          console.log(textTopValuesMove[textProgress]);
          console.log("Base Values: " + textTopBaseValues[textProgress]);
          const upValue = textTopValuesMove[textProgress];
          console.log(upValue);
          textControllers[textProgress].start(animations.textUp(upValue));
          //textControllers[textProgress].start(animations.textUP2);
          console.log(textTopValuesMove[textProgress]);
          if (textProgress === textList[progress].length - 1) {
            setAnimationSelection(4);
            // Reset for text progress
            setTextProgress(0);
          } else {
            setTextProgress(textProgress + 1);
          }
        } else {
        console.log("Invalid textProgress value");
        }
        break;
      case 4:
        await Promise.all([
          graphicController.start(animations.rightGraphicOut),
          titleController.start(animations.leftTitleOut),
          ...textList[progress].map((_, i) =>
            textControllers[i].start(animations.leftTextOut)
          ),
        ]);
        Promise.all(
          titleController.start(animations.hiddenTitleReset),
          ...textList[progress].map((_, i) =>
            textControllers[i].start(animations.setTextsHidden)
          )
        );
        textControllers.map((controller) =>
          controller.start(animations.hiddenTextReset(textTopBaseValues[1]))
        );
        setAnimationSelection(1);
        setProgress(1);
        break;
      default:
        console.log("Error: Unknown animation selection");
        setProgress(1);
        break;
    }
  };

  // assignment to animation controller
  const graphicController = useAnimation();
  const titleController = useAnimation();
  
  {/* sure there is a better solution than this */}
  const textControllers = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  // temporary controls for moving the animations
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const updateYValues = () => {
    const textTwo = document.getElementsByClassName('textOne');
    const secondElement = textTwo[0];
    const height = secondElement.offsetHeight;
    updateTextBaseTopValues(1, `calc(50% + ${height}px + 50px)`)
    updateTextTopValues(1, `calc(50% + ${height}px - 50px)`);

    const textThree = document.getElementsByClassName('textThree');
    const thirdElement = textThree[0];
    const thirdHeight = thirdElement.offsetHeight;
    updateTextBaseTopValues(2, `calc(50% + ${height}px + ${thirdHeight}px + 100px)`);
    updateTextTopValues(2, `calc(50% + ${height}px + ${thirdHeight}px)`);

    const textFour = document.getElementsByClassName('textFour');
    const fourthElement = textFour[0];
    const fourthHeight = fourthElement.offsetHeight;
    updateTextBaseTopValues(3, `calc(50% + ${height}px + ${thirdHeight}px + ${fourthHeight}px + 150px)`);
    updateTextTopValues(3, `calc(50% + ${height}px + ${thirdHeight}px + ${fourthHeight}px + 50px)`);
  }

  // Calculate the correct top values for the text elements

  /*
  useEffect(() => {
    const textTwo = document.getElementsByClassName('textOne');
    const secondElement = textTwo[0];
    const height = secondElement.offsetHeight;
    updateTextBaseTopValues(1, `calc(50% + ${height}px + 50px)`)
    updateTextTopValues(1, `calc(50% + ${height}px - 50px)`);

    const textThree = document.getElementsByClassName('textThree');
    const thirdElement = textThree[0];
    const thirdHeight = thirdElement.offsetHeight;
    updateTextBaseTopValues(2, `calc(50% + ${height}px + ${thirdHeight}px + 100px)`);
    updateTextTopValues(2, `calc(50% + ${height}px + ${thirdHeight}px)`);

    const textFour = document.getElementsByClassName('textFour');
    const fourthElement = textFour[0];
    const fourthHeight = fourthElement.offsetHeight;
    updateTextBaseTopValues(3, `calc(50% + ${height}px + ${thirdHeight}px + ${fourthHeight}px + 150px)`);
    updateTextTopValues(3, `calc(50% + ${height}px + ${thirdHeight}px + ${fourthHeight}px + 50px)`);
  }, [animationSelection])
  */

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}>
      <div
        style={{
          width: "80%",
          height: "80%",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}>
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
            opacity: 0.25,
            right: "50%",
            top: textTopBaseValues[0]
          }}
          style={{ width: "50%" }}>
          <Text text={textList[progress][0]} />
        </motion.div>

        <motion.div
          className="textTwo"
          animate={textControllers[1]}
          initial={{
            position: "absolute",
            opacity: 0.25,
            right: "50%",
            top: textTopBaseValues[1]
          }}
          style={{ width: "50%" }}>
          <Text text={textList[progress][1]} />
        </motion.div>

        <motion.div
          className="textThree"
          animate={textControllers[2]}
          initial={{
            position: "absolute",
            opacity: 0.25,
            right: "50%",
            top: textTopBaseValues[2]
          }}
          style={{ width: "50%" }}>
          <Text text={"text x y was weiß ich"} />
        </motion.div>

          <motion.div
          className="textFour"
          animate={textControllers[3]}
          initial={{
            position: "absolute",
            opacity: 0.25,
            right: "50%",
            top: textTopBaseValues[3]
          }}
          style={{ width: "50%" }}>
          <Text text={"text hundert 2"} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
