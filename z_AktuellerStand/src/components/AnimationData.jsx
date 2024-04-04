import exampleImg from '../assets/images/exampleImg.gif';
import bild1 from '../assets/images/Bild1.gif';

export const AnimationData = {
  Einleitung: {
    Type: "Base",
    Content: [
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 1" },
        Texts: [
          {typeText: "titel", string: "EU AI Act" },
          {typeText: "titel", string: "EU IAA Act" },
          {typeText: "text", string: "Wie funktioniert er?" },
          {typeText: "text", string: "Warum ist er wichtig?" },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "titel", string: "Wer wir sind" },
        ]
      },
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 3" },
        Texts: [
          {typeText: "titel", string: "Einfluss von KI" },
          {typeText: "titel", string: "Entscheidungen von KI wirken auf unseren Alltag" },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "titel", string: "Warum ist wichtig?" },
          {typeText: "text", string: "Durch Einfluss wichtig, dass Systeme zu unseren Werten passen und keine Gefahr darstellen" },
          {typeText: "titel", string: "Geht nicht immer (Kindergeldaffäre 2020)" },
        ]
      },
    ],
  },
  Risikostufen: {
    Type: "Base",
    Content: [
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 1" },
        Texts: [
          {typeText: "titel", string: "Überschrift" },
          {typeText: "text", string: "Text 1" },
          {typeText: "text", string: "Text 2 ist länger Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum commodi maxime? Ducimus suscipit dolore ab eligendi. Dolorem repellendus accusantium obcaecati optio ipsam blanditiis, quia, eum numquam quas rem sapiente." },
          {typeText: "text", string: "Text 3" },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "titel", string: "Einzelnd" },
          {typeText: "titel", string: "duo" },
          {typeText: "titel", string: "tripel" },
        ]
      },
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 3" },
        Texts: [
          {typeText: "text", string: "UX für KI text" },
          {typeText: "text", string: "Text im 3." },
        ]
      },
    ],
  },
};
