import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { animations } from './animations';
import Title from './Title';
import { GraphicContainer } from './GraphicContainer';
import { Text } from './Text';
// import images in module "parent"
import bild1 from './assets/Bild1.gif'
import bild2 from './assets/Bild2.gif'

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

  const titleList = ["Ein zentrales Werkzeug", "1. minimales Risiko", "2. begrenztes Risiko", "3. hohes Risiko", "4. Inakzeptables Risiko", "Ein kleines Fazit", "Herzlichen Dank!"];
  const imageList = [
    { type: 'image', src: bild1, alt: 'Bild 1' },
    { type: 'image', src: bild2, alt: 'Bild 2' },
    { type: 'image', src: bild2, alt: 'Bild 4' },
  ];

  const textList = [
    ["Progress: 1, Text: 1, das ist ein deutlich längerer text. Dieser Text ist sehr lang sehr sehr lang. Progress: 1, Text: 1, das ist ein deutlich längerer text. Dieser Text ist sehr lang sehr sehr lang.", "Progress: 1, Text: 2", "Progress: 1, Text: 3"],
    ["Progress: 2, Text: 1", "Progress: 2, Text: 2", "Progress: 2, Text: 3", "Progress: 2, Text: 4"],
    ["Progress: 3, Text: 1", "Progress: 3, Text: 2", "Progress: 3, Text: 3"],
  ];

  // handles the correct animation
  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      console.log("left arrow key");
    } else if (event.key === "ArrowRight") {
      console.log("arrow key");
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
        setAnimationSelection(2);
        break;
      case 2:
        await titleController.start(animations.leftTitleUp);
        setAnimationSelection(3);
        break;
      case 3:
        switch (textProgress) {
          case 0:
            console.log("textprogress: " + textProgress);
            textControllers[textProgress].start(animations.textUp);
            setTextProgress(1);
            break;
          case 1:
            console.log("textprogress: " + textProgress);
            textControllers[textProgress].start(animations.textUp);
            setTextProgress(2);
            break;
          case 2:
            console.log("textprogress: " + textProgress);
            textControllers[textProgress].start(animations.textUp);
            if (textList[progress].length === 4) {
              setTextProgress(3);
            } else {
              setAnimationSelection(4);
            // Reset for text progress
            setTextProgress(0);
            }
            break;
          case 3:
            console.log("textprogress: " + textProgress);
            if (textList[progress].length === 4) {
              textControllers[textProgress].start(animations.textUp);
            }
            setAnimationSelection(4);
            // Reset for text progress
            setTextProgress(0);
            break;
          default:
            console.log("Error: Unknown Text progress value");
            break;
        }
        break;
      case 4:
        await Promise.all([
          graphicController.start(animations.rightGraphicOut),
          titleController.start(animations.leftTitleOut),
          ...textList[progress].map((_, i) => textControllers[i].start(animations.leftTextOut)),
        ])
        Promise.all(
          titleController.start(animations.hiddenTitleReset),
          ...textList[progress].map((_, i) => textControllers[i].start(animations.setTextsHidden)),
        )
        textControllers.map((controller) => controller.start(animations.hiddenTextReset));
        setAnimationSelection(1);
        setProgress(1);
        break;
      default:
        console.log("Error: Unknown animation selection");
        setProgress(1);
        break;
    }
  }

  // assignment to animation controller
  const graphicController = useAnimation();
  const titleController = useAnimation();
  {/* sure there is a better solution than this */}
  const textControllers = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ]


  // temporary controls for moving the animations
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f0f0f0',
        }}
        >
        {/* Graphic Animation Container -- the style is for vertically centering, pos = absolute and left = 100% necessary to be out of parent */}
        <motion.div animate={graphicController} initial={{ position: 'absolute', left: '100%' }} style={{ width: '50%', top: '50%', transform: 'translateY(-50%)' }}>
          <GraphicContainer type={imageList[progress].type} src={imageList[progress].src} altText={imageList[progress].alt} />
        </motion.div>

        {/* Title Animation Container --  */}
        <motion.div animate={titleController} initial={{ position: 'absolute', right: '100%' }} style={{ width: '50%', top: '50%', transform: 'translateY(-50%)' }}>
          <Title titleText={titleList[progress]} />
        </motion.div>

        {/* Text Animation Containers -- translateYValue: difference in position of consequent texts -> 500 * index is the distance, should be variable for responsiveness*/}
        {textList[progress].map((text, index) => {
          const translateYValue = index === 0 ? '-50%' : `${-50 + 500 * index}%`;

          return (
            <motion.div
              key={index}
              animate={textControllers[index]}
              initial={{ position: 'absolute', opacity: 0, right: '50%', translateY: translateYValue }}
              style={{ width: '50%', top: '50%' }}
            >
              <Text text={text} />
            </motion.div>
          )
        })}


      </div>
    </div>
  );
}

export default App