/* eslint-disable no-unused-vars */
// import images in module "parent"
import bild1 from "./assets/Bild1.gif";
import bild2 from "./assets/Bild2.gif";

import AnimationContainer from "./AnimationContainer";

function App() {

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
      overflow: "hidden",
    }}>
        <AnimationContainer titleList={titleList} imageList={imageList} textList={textList} />
    </div>


  );
}

export default App;
