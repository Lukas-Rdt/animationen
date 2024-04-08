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
          {typeText: "titel", string: "Das ist Dana." },
          {typeText: "titel", string: "Das ist Dana." },
          {typeText: "titel", string: "Das ist Dana." },
          {typeText: "titel", string: "Das ist Dana." },
        ],
        AnimationOrder: [
          [
            [
              { element: "text0", animationSelected: "leftTitleIn", speed: "1.5" },
              { element: "image", animationSelected: "rightGraphicIn", speed: "1.5"  },
            ],
            [
              { element: "text0", animationSelected: "hideExplanation", speed: "1.5"  },
            ]
          ],
          [
            [
              { element: "text0", animationSelected: "showExplanation", speed: "1.5"  },
              { element: "image", animationSelected: "rightGraphicOut", speed: "1.5"  },
            ]
          ],
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "titel", string: "Dana arbeitet bei"},
          {typeText: "titel", string: "NoFoodToWaste"},
          {typeText: "text", string: "kauft Lebensmittel kurz vor oder nach Ablauf des Mindesthaltbarkeitsdatums (MHD) und verkauft sie günstig weiter." },
        ],
        AnimationOrder: [
          [
            [
              { element: "text0", animationSelected: "resetTranslateMinusFast", speed: "0.1" },
              { element: "text0", animationSelected: "bottom50", speed: "0.1" },
              { element: "text1", animationSelected: "top50Fast", speed: "0.1" },
              { element: "text1", animationSelected: "colorCyanFast", speed: "0.1"},
            ],
            [
              { element: "text0", animationSelected: "show", speed: "1.5" },
              { element: "image", animationSelected: "show", speed: "1.5" },
            ],
            [
              { element: "text1", animationSelected: "show", speed: "1.5" },
            ]
          ]
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
          {typeText: "titel", string: "Text 1" },
          {typeText: "text", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
          {typeText: "text", string: "Text 4" },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "text", string: "Text 1" },
          {typeText: "text", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
        ]
      },
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 3" },
        Texts: [
          {typeText: "titel", string: "Text 1" },
          {typeText: "titel", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
          {typeText: "titel", string: "Text 4" },
          {typeText: "titel", string: "Text 5" },
        ]
      },
    ],
  },
  Designimplikationen: {
    Type: "Base",
    Content: [
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 1" },
        Texts: [
          {typeText: "titel", string: "Text 1" },
          {typeText: "text", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
          {typeText: "text", string: "Text 4" },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "text", string: "Text 1" },
          {typeText: "text", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
        ]
      },
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 3" },
        Texts: [
          {typeText: "titel", string: "Text 1" },
          {typeText: "titel", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
          {typeText: "titel", string: "Text 4" },
          {typeText: "titel", string: "Text 5" },
        ]
      },
    ],
  },
  Fazit: {
    Type: "Base",
    Content: [
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 1" },
        Texts: [
          {typeText: "titel", string: "Text 1" },
          {typeText: "text", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
          {typeText: "text", string: "Text 4" },
        ]
      },
      {
        Image: { typeImg: "image", src: bild1, alt: "Bild 2" },
        Texts: [
          {typeText: "text", string: "Text 1" },
          {typeText: "text", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
        ]
      },
      {
        Image: { typeImg: "image", src: exampleImg, alt: "Bild 3" },
        Texts: [
          {typeText: "titel", string: "Text 1" },
          {typeText: "titel", string: "Text 2" },
          {typeText: "text", string: "Text 3" },
          {typeText: "titel", string: "Text 4" },
          {typeText: "titel", string: "Text 5" },
        ]
      },
    ],
  },
};
