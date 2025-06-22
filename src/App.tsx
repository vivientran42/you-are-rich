import { useState, useEffect } from "react";
import CardUI from "./components/card";
import CurrentsUI from "./components/currents";
import EntryForm from "./components/entryForm";
import { getEntries, Entries } from "./db/entries";
import { getLatestCurrents, getAllCurrents, Currents } from "./db/currents";

function App() {
  // PROMPTS
  const promptRichPairs = [
    { prompt: "What are you grateful for?", rich: "life" },
    { prompt: "What is a fond memory you have?", rich: "life" },
    { prompt: "What are you excited for?", rich: "life" },
    { prompt: "What are you thinking about?", rich: "life" },
    { prompt: "What are you doing right now?", rich: "time" },
    { prompt: "What are you looking forward to?", rich: "time" },
    { prompt: "What did you dream about?", rich: "sleep" },
    { prompt: "How are you feeling?", rich: "love" },
  ];

  const [prompt, setPrompt] = useState("");
  const [richValue, setRichValue] = useState("");

  const changePromptAndRichValue = (): void => {
    const randomIndex = Math.floor(Math.random() * promptRichPairs.length);
    setPrompt(promptRichPairs[randomIndex].prompt);
    setRichValue(promptRichPairs[randomIndex].rich);
  };

  useEffect(() => {
    changePromptAndRichValue();
  }, []);

  // ENTRIES
  const [entries, setEntries] = useState<Entries[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      const data = await getEntries();
      setEntries(data);
    }
    fetchEntries();
  }, []);

  // CURRENTS
  const [showCurrents, setShowCurrents] = useState(false);
  const [currents, setCurrents] = useState<Currents[]>([]);

  useEffect(() => {
    async function fetchCurrents() {
      const data = await getAllCurrents();
      setCurrents(data);
    }
    fetchCurrents();
  }, []);

  const [latestCurrentsFields, setLatestCurrentsFields] = useState<
    Partial<Currents>
  >({});

  useEffect(() => {
    async function fetchLatestCurrents() {
      const latest = await getLatestCurrents();
      setLatestCurrentsFields(latest[0] || {});
    }
    fetchLatestCurrents();
  }, []);

  return (
    <main>
      <div className="relative flex flex-row justify-end w-full min-w-full gap-x-10 px-10 pt-5">
        <img
          src="/logo.png"
          className="h-6 md:h-8 lg:h-10 2xl:h-12 absolute left-1/2 transform -translate-x-1/2"
          alt="You Are Rich logo"
          fetchPriority="high"
          loading="eager"
        />

        <button
          className="text-sm sm:text-md font-mono font-semibold text-red-500 hover:scale-105 ease-in-out duration-200"
          onClick={() => setShowCurrents((prev) => !prev)}
        >
          CURRENTS
        </button>

        <button
          className="text-sm sm:text-md font-mono font-semibold text-red-500 hover:scale-105 ease-in-out duration-200"
          onClick={() => setShowCurrents((prev) => !prev)}
        >
          REMINISCE
        </button>

        <button
          className="text-sm sm:text-md font-mono font-semibold text-red-500 hover:scale-105 ease-in-out duration-200"
          onClick={() => setShowCurrents((prev) => !prev)}
        >
          ABOUT
        </button>
      </div>

      {showCurrents && (
        <CurrentsUI
          mp3={latestCurrentsFields.mp3}
          artist={latestCurrentsFields.artist}
          book={latestCurrentsFields.book}
          author={latestCurrentsFields.author}
          mp4={latestCurrentsFields.mp4}
          showCurrents={showCurrents}
          setShowCurrents={setShowCurrents}
          setLatestCurrentsFields={setLatestCurrentsFields}
        />
      )}

      <div className="px-10 pt-36 pb-30 min-w-full min-h-[50vh]">
        <EntryForm
          prompt={prompt}
          richValue={richValue}
          setEntries={setEntries}
          setCurrents={setCurrents}
          changePromptAndRichValue={changePromptAndRichValue}
        />
      </div>

      <div className="min-h-[50vh] bg-red-500">
        <div className="bg-red-500 grid place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full p-10">
          {entries
            .slice()
            .reverse()
            .map((entry, index) => {
              const current =
                currents.find((c) => c.id === entry.currentId) || {};
              return (
                <CardUI
                  key={index}
                  date={entry.date}
                  prompt={entry.prompt}
                  submittedEntry={entry.entry}
                  mp3={current.mp3 ?? undefined}
                  artist={current.artist ?? undefined}
                  book={current.book ?? undefined}
                  author={current.author ?? undefined}
                  mp4={current.mp4 ?? undefined}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default App;
