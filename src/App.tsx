import { useState, useEffect } from "react";
import Card from "./components/card";
import Currents from "./components/currents";

function App() {
  // setting prompt
  const prompts = [
    "What are you grateful for?",
    "What are you excited for?",
    "What are you currently curious about?",
    "How are you feeling?",
    "What are you thinking about?",
    "What are you doing right now?",
    "What did you dream about?",
    "What are you doing tomorrow?",
    "What are you looking forward to?",
  ];

  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  }, []);

  // setting rich values
  const richValues = ["life", "love", "time"];

  const [richValue, setRichProp] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * richValues.length);
    setRichProp(richValues[randomIndex]);
  }, []);

  // auto-resize text area
  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.target.style.height = "1.5em";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // toggling currents menu
  const [showCurrents, setShowCurrents] = useState(false);

  const components = Array(10).fill(null);

  return (
    <main>
      <div className="flex flex-row justify-end w-full min-w-full gap-x-10 px-10 pt-5">
        <button
          className="text-md font-mono font-semibold text-red-500 hover:scale-105 ease-in-out duration-200"
          onClick={() => setShowCurrents((prev) => !prev)}
        >
          CURRENTS
        </button>
      </div>

      {showCurrents && (
        <Currents
          showCurrents={showCurrents}
          setShowCurrents={setShowCurrents}
        />
      )}

      <div className="flex flex-col items-center w-full min-w-full px-10 pt-30">
        <textarea
          id="entry"
          placeholder={prompt}
          onInput={autoResize}
          onChange={autoResize}
          className="w-full border-b-3 border-red-500 text-3xl sm:text-5xl text-slate-600"
        />
        <button className="bg-red-500 hover:bg-red-600 hover:shadow-sm text-white py-3 px-20 mt-7 mb-20 rounded-xl text-3xl sm:text-5xl hover:scale-102 ease-in-out duration-500">
          I am rich in {richValue}
        </button>
      </div>

      <div className="min-h-[50vh] bg-red-500">
        <div className="bg-red-500 grid place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full p-10">
          <Card
            artist="louis armstrong"
            mp4="watching the detectives"
            description="laptop go brr"
          />
          {components.map((_, index) => (
            <Card
              mp3="i wish i was stephen malkmus"
              artist="beabadobee"
              description="i had a good day"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
