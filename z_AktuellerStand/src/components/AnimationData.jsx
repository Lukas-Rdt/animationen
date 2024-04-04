import exampleImg from '../assets/images/exampleImg.gif';
import bild1 from '../assets/images/Bild1.gif';

export const AnimationData = {
  Einleitung: {
    Titel: [
      "EU AI Act",
      "Wer wir sind",
      "Einfluss von KI",
      "Warum wichtig?",
    ],
    Bilder: [
      { type: "image", src: exampleImg, alt: "Bild 1" },
      { type: "image", src: bild1, alt: "Bild 2" },
      { type: "image", src: exampleImg, alt: "Bild 3" },
      { type: "image", src: exampleImg, alt: "Bild 4" },
    ],
    Stichpunkte: [
      [
        "Was ist der EU AI Act?",
        "Wie funktioniert er?",
        "Warum ist er wichtig?",
      ],
      [
        "Person 1",
        "Person 2",
      ],
      [
        "Entscheidungen von KI wirken auf unseren Alltag",
      ],
      [
        "Durch Einfluss wichtig, dass Systeme zu unseren Werten passen und keine Gefahr darstellen",
        "Geht nicht immer (Kindergeldaffäre 2020)"
      ]
    ],
  },

  Risikostufen: {
    Titel: [
      "zwei zentrale Werkzeuge",
      "1. minimales Risiko",
      "2. begrenztes Risiko",
      "3. hohes Risiko",
      "4. Inakzeptables Risiko",
      "Ein kleines Fazit",
      "Herzlichen Dank!",
    ],
    Bilder: [
      { type: "image", src: exampleImg, alt: "Bild 1" },
      { type: "image", src: bild1, alt: "Bild 2" },
      { type: "image", src: exampleImg, alt: "Bild 4" },
    ],
    Stichpunkte: [
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
    ],
  },
};
