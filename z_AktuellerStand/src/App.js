import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SubTopicPage from "./components/pages/SubTopicPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppContext from "./components/AppContext";
import AnimationContainer from "./components/AnimationContainer";

// static content of subtopics
const topicContents = {
  Einleitung: {
    Einleitungsvideo: {
      link: "https://www.youtube-nocookie.com/embed/HLgKwZkm59M?si=p-12Mfp5IoZCa5aq&amp;rel=0&amp;modestbranding=1",
      title: "Einleitungsvideo",
    },
    "Was ist der EU AI Act":
      "Hallo, herzlich willkommen zu unserem Einleitungsvideo zum EU AI Act. Hier geben wir Ihnen einen kurzen Überblick, was der EU AI Act eigentlich ist, wie er funktioniert und warum er für Sie als Teil einer gemeinwohlorientierten Organisation eigentlich wichtig ist. Wir sind (Vorstellung der Personen). Aber nun zum Inhalt: Wenden wir uns erstmal dem Einfluss von KI Systemen auf unsere Gesellschaft zu.Wie sich immer weiter zeigt, haben KI Systeme einen erheblichen Einfluss auf unseren Alltag - und damit auf uns als Individuen und auch unser Zusammenleben.Die Entscheidungen, die von und mit KI Systemen getroffen werden, können entscheidend auf unser Leben einwirken - zum Beispiel im Kleinen bei der Empfehlung von Produkten oder erheblich bei der Anpassung medizinischer Therapien. Es ist also notwendig, sicherzustellen, dass die Systeme zu unseren Werten passen und keine Gefahr darstellen. Das gelingt nicht immer.Ein Beispiel war 2020 die sogenannte Kindergeldaffäre in den Niederlanden.Diese hatte nicht Einfluss auf eine Vielzahl ungerechtfertigt benachteiligter Familien, sondern war auch einer der Gründe für den Rücktritt der Regierung unter Ministerpräsident Rutte.In der Affäre ging es darum, dass ausgezahlte Kindergelder zurückgefordert worden war - ein KI System hatte dabei jedoch fälschlich besonders Personen mit doppelter Staatsbürgerschaft unter Verdacht gestellt.Viele der Forderungen waren unbegründet, bedeuten aber für die Familien eine finanzielle Katastrophe mit unabsehbaren Auswirkungen. Wie lernen wir aus diesen Fehlern ? Es ist klar, dass wir Regeln, Methoden und Vertrauensstellen für KI Systeme brauchen, die irgendwo zentral Organisiert sein sollten bspw.bei einer Landesregierung, einer Prüfbehörde oder ähnlichem.Darum soll es in dieser Einheit gehen.Wir betrachten den EU AiIAct als zentrales Thema für die Regulierung von Ki Systemen und die damit einhergehenden Ansprüche an diejenigen, die KI - basierte Projekte umsetzen wollen. Mit dem EU AI Act hat die EU eine EU - weite Verordnung geschaffen, die für KI - Systeme in jedem Bereich gilt.Regelungen auf nationaler Ebene sind nicht notwendig - aber einzelne Länder wie Deutschland werden in der Pflicht stehen, die Einhaltung zu überprüfen. Um einen genauen Einblick zu bekommen, wie diese Regulierungen zwischen den Ländern entstanden sind und funktionieren, haben wir heute einen Experten aus dem Institut für Multimediale und Interaktive Systeme der Universität zu Lübeck hier.",
  },
  Risikostufen: {
    Video: {
      link: "https://www.youtube-nocookie.com/embed/zkfqjX6om8g?si=XKEX_r1jRmViUJkB&amp;rel=0&amp;modestbranding=1",
      title: "Einleitungsvideo",
    },
    "Wie funktionieren Risikostufen":
      "Wie zuvor besprochen wollen wir uns als erstes mit dem Thema Risikostufen beschäftigen.  Zentral ist dabei das Verständnis, dass nicht jedes KI-System gleich viel Einfluss auf uns als Menschen hat - bei manchen sind die Risiken höher als bei anderen. Manchmal sogar inakzeptabel hoch. Die Notwendigkeit einer solchen Unterteilung hat auch die EU erkannt und deswegen ein zentrales Werkzeug im EU AI Act erschaffen - die Einteilung von KI-Systemen in vier Risikostufen: Die niedrigste Stufe geht davon aus, dass durch ein KI-System nur ein minimales Risiko besteht. Beispiele hierfür sind KI-Systeme, die in Videospielen eingesetzt werden oder intelligente Spam-Filter, die bestenfalls nach festen Regeln vorgehen. Die zweite Stufe kategorisiert Systeme mit einem begrenzten Risiko s.g. limited risk. Bei diesen gelten insbesondere Transparenzvorschriften, d.h., es muss klar gemacht werden, dass KI Systeme eingesetzt werden und wie. Das gilt z.B. beim Einsatz von Chatbots. Das Herzstück des Acts stellen final die High-Risk-Systeme da. Hierzu zählen alle Systeme, die irgendeiner Zulassung bedürfen. Dazu gehören medizinische Systeme, Systeme im Bereich der Strafverfolgung oder auch Systeme, die zur politischen Meinungsbildung geeignet sind. Der EU AI Act formuliert in dieser Kategorie hohe Anforderungen in Bezug auf die verschiedenen genutzten Variablen. So beispielsweise für die Dokumentation des Trainings, des genutzten Models und der bei der Entwicklung getroffenen Designentscheidungen. Für uns ist dabei vor allem der Punkt Transparenz und die Möglichkeit, der menschlichen Kontrollfähigkeit interessant.",
    "Zu beachten bei Risikostufen":
      'Letztlich gibt es noch Systeme mit einem inakzetabel hohen Risiko. Darunter fallen alle Systeme, die für Menschen und unsere demokratischen Werte gefährlich sein können bspw. Social Scoring Systeme, Deep Fake Tools oder Profiling systeme. Alle Systeme, die in diese Kategorien fallen, sind vollständig verboten. Generell steht noch nicht fest, wie viele Systeme am Ende im Bereich high risk landen werden, aber wir gehen derzeit davon aus, dass es zwischen 15-30% sein könnten. Insbesondere gemeinwohlorienterte KI kann zudem das ziel haben, allen Anforderungen gerecht zu werden - egal ob high risk oder nicht. Ein letzter Hinweis noch: sehr mächtige KI-Modelle, die man für viele Zwecke einsetzen kann, nennt die Verordnung "General Purpose AI". Dazu gehören so Systeme wie große Sprachmodelle, die hinter ChatGPT stecken. Diese Systeme gehören nicht explizit einer Risikostufe an, haben aber nochmal ganz eigene Regeln, die in einem gesonderten Kapitel des EU AI Acts festgehalten sind.',
  },
  Designimplikationen: {
    Video: {
      link: "https://www.youtube-nocookie.com/embed/LDvVRvG7OB0?si=R1yp1rZWo-kn1qo0&amp;rel=0&amp;modestbranding=1",
      title: "Einleitungsvideo",
    },
    "Weitergehende Kriterien":
      'Nachdem wir uns nun damit beschäftigt haben was der EU AI Act eigentlich ist und wie er versucht durch Risikostufen die Nutzung von verschiedenen Arten von KI Systemen zu regulieren, wollen wir uns jetzt einmal angucken was diese Regeln jetzt für die Gestaltung bedeuten. Schauen wir uns das mal an ein paar Beispielen an! Als erstes greifen wir unseren Telefon-Seelsorge Chatbot auf. Egal ob er am Ende in einem Kontext mit hohem Risiko oder nicht eingesetzt wird, es MUSS klar gemacht werden, dass hier kein Mensch agiert. Insofern sollte man z.B. nicht "schreibt" als Animation einsetzen, wenn der Bot antwortet. Das wäre täuschend und deutet auf einen wirklichen Menschen hin. Eine Alternative wäre der Einsatz von eher technischen Begriffen wie "Antwort wird berechnet", die auf die maschinelle Natur des Gesprächspartners hinweisen. Auch bei einer gegebenen Antwort sollte der Chatbot seine Grenzen verdeutlichen, z.B. indem er markiert, welche Absichten (Intent) er erkannt hat. Zusätzlich muss die menschliche Kontrollfähigkeit hoch genug sein - Mitarbeitende der Telefonseelsorge müssen den Chatbot (leicht) anpassen können. Es muss ein Interface geben, um z.B. die Länge der Antworten zu steuern oder wann der Chatbot an menschliche Agenten weitergibt so, dass er möglichst einfach und barrierefrei in der praktischen Alltagsnutzung ist. Greifen wir uns als zweites Beispiel den Algorithmus zur Detektion von Hassnachrichten. Bei einer solchen Anwendung geht es uns vor allem darum, zu prüfen, ob er so arbeitet, wie von uns gewünscht. Daher sollten wir bei der Gestaltung daran denken, dass er nachvollziehbare Erklärungen über sein trainiertes Modell abgeben kann. Eine Möglichkeit wären die von uns erklärten Shapley Values aus dem Modul X. *Hier nochmal ein Beispiel.* Nutzende können dann die Visualisierung aufrufen und für eine bestimmte Nachricht erkennen, weshalb diese als Hatespeech klassifiziert wird. alternativ kann man aber auch über so genannte *counterfactual explanation* arbeiten. Bei diesen kann die nutzende Person sich anzeigen lassen, durch welche Wortänderungen das System NICHT mehr von *hate speech* ausgehen würde. Hier ist jedoch Vorsicht geboten - die Systeme können so vielleicht leichter ausgetrickst werden, weil man genau sehen kann, wie sie funktionieren. Es ist also eine Gewissensentscheidung wie transparent die Antworten des Systems für die Nutzenden sein sollen. Unser letztes Beispiel beschäftigt sich mit der Empfehlung von Nahrungsmitteln. Bei einem solchen System ist es unser Ziel zu verhindern, dass Menschen von Handlungen/ Empfehlungen überzeugt werden, die sie selbst nicht wollten oder gutheißen. Daher sollten wir explizit zeigen, weshalb ein Vorschlag für ein spezifisches Lebensmittel gegeben wird, z.B. das stärkste Feature wie (Beispiel) für einen Vorschlag hervorheben. Eine weiter Möglichkeit, um ungewollte Beeinflussung der Nutzenden zu verhindern ist es die Distanz zwischen präsentierten Vorschlägen zu kommunizieren bspw. wenn sich zwei Produkte, die durch das System auf verschiedene Plätze eingeordnet worden sind eigentlich nur sehr geringfügig unterscheiden. Mit diesen Anwendungsbeispielen im Kopf, was bedeutet das für Sie? Welche Designentscheidungen müssen sie treffen so, dass ihr System nicht nur konform mit dem EU AI ACT ist, sondern auch die Bedürfnisse der Nutzenden in den Mittelpunkt stellt.',
  },
  Fazit: {
    Video: {
      link: "https://www.youtube-nocookie.com/embed/PZAkt-EuKn0?si=g-hnbptFXBW6kajx&amp;rel=0&amp;modestbranding=1",
      title: "Einleitungsvideo",
    },
    Diskussion:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos temporibus itaque sit ipsa ex reiciendis, sint earum hic aliquid vel atque enim, inventore, magni numquam commodi iste? Quam, ab iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur odit aut impedit facilis laboriosam, adipisci eaque eos incidunt ad tenetur debitis repudiandae eius non recusandae. Quo harum at nostrum veritatis.",
    Lernüberprüfung: "quiz?",
  },
};

function App() {
  return (
    <div className="App">
      <AppContext.Provider value={topicContents}>
        <BrowserRouter>
          <div className="flex">
            <div className="flex flex-col w-full">
              <Header />
              <Routes>
                <Route index element={<MainPage />} />
                <Route path="subtopic/:subtopicId" element={<SubTopicPage />} />
                <Route path="animationTest" element={<AnimationContainer />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
