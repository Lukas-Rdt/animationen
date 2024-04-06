import exampleImg from '../assets/images/exampleImg.gif';
import bild1 from '../assets/images/Bild1.gif';

export const AnimationData = {
  Einleitung: {
    Type: "Base",
    Content: [
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 1" },
        Texts: [
          {typeText: "titel", string: "Das ist Dana." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "titel", string: "Dana arbeitet bei"},
          {typeText: "titel", string: "NoFoodToWaste"},
          {typeText: "text", string: "kauft Lebensmittel kurz vor oder nach Ablauf des Mindesthaltbarkeitsdatums (MHD) und verkauft sie günstig weiter." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "text", string: "Bei NoFoodToWaste verwendet Dana verschiedene Software-Tools, um ihre Arbeit zu erleichtern." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "text", string: "Ein Beispiel dafür ist die Rechtschreibprüfung ihres Textverarbeitungsprogramms." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "text", string: "Die Kunden des Unternehmens können im Gespräch mit einem Chatbot erfahren, was das MHD aussagt und wie sie Lebensmittel sparen." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "text", string: "Ein selbstlernender Algorithmus gibt an, wann in welchen Läden mit welcher Wahrscheinlichkeit wie viele Lebensmittel kurz vor dem MHD sind." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "text", string: "Außerdem kann Dana mit ihrem E-Mail-Programm automatisch Antworten generieren und versenden." },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 4" },
        Texts: [
          {typeText: "text", string: "Nun fragt sie sich, ab wann man bei solchen Assistenzsystemen von \"Künstlicher Intelligenz spricht\"" },
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
