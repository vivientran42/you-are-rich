import { useState, useEffect } from "react";
import CardUI from "@/components/card";
import CurrentsUI from "@/components/currents";
import EntryFormUI from "@/components/entryForm";
import ModalUI from "@/components/modal";
import { getEntries, Entries } from "@/db/entries";
import { getLatestCurrents, getAllCurrents, Currents } from "@/db/currents";
import FormatItems from "@/utils/formatItems";

function App() {
  // PROMPTS
  const promptRichPairs = [
    { prompt: "What are you grateful for?", rich: "life" },
    { prompt: "What is a fond memory you have?", rich: "life" },
    { prompt: "What are you excited for?", rich: "life" },
    { prompt: "What are you thinking about?", rich: "life" },
    { prompt: "What are you doing right now?", rich: "time" },
    { prompt: "What are you looking forward to?", rich: "time" },
    { prompt: "What did you dream about?", rich: "rest" },
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

  // ABOUT
  const [showAbout, setShowAbout] = useState(false);

  const handleOpenAbout = () => setShowAbout(true);
  const handleCloseAbout = () => setShowAbout(false);

  // REMINISCE
  interface ReminisceProps {
    date: string;
    prompt: string;
    submittedEntry: string;
    items: { text: string }[];
  }

  const [showReminisce, setshowReminisce] = useState(false);
  const [randomEntry, setRandomEntry] = useState<ReminisceProps | null>(null);

  const handleOpenReminisce = () => {
    getRandomEntry();
    setshowReminisce(true);
  };
  const handleCloseReminisce = () => setshowReminisce(false);

  const getRandomEntry = (): void => {
    if (entries.length === 0) {
      setRandomEntry(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * entries.length);
    const randomEntry = entries[randomIndex];
    const current = currents.find((c) => c.id === randomEntry.currentId) || {};
    const items = FormatItems(
      current.mp3,
      current.artist,
      current.book,
      current.author,
      current.mp4,
    );
    setRandomEntry({
      date: randomEntry.date,
      prompt: randomEntry.prompt,
      submittedEntry: randomEntry.entry,
      items: items,
    });
  };

  return (
    <main>
      <div className="bg-fuchsia-50 relative flex flex-row justify-end w-full min-w-full gap-x-10 px-10 pt-5">
        <img
          src="/logo.png"
          className="h-0 md:h-7 lg:h-7 2xl:h-12 absolute left-10 hover:scale-102 ease-in-out duration-400"
          alt="You Are Rich logo"
          fetchPriority="high"
          loading="eager"
        />

        <img
          src="/moneybag.png"
          className="h-7 md:h-0 absolute left-10 hover:scale-102 ease-in-out duration-400"
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
          onClick={handleOpenReminisce}
        >
          REMINISCE
        </button>

        <button
          className="text-sm sm:text-md font-mono font-semibold text-red-500 hover:scale-105 ease-in-out duration-200"
          onClick={handleOpenAbout}
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

      <ModalUI
        isOpen={showReminisce}
        onClose={handleCloseReminisce}
        size={!randomEntry ? ("px-20 lg:px-16 py-10 lg:py-10 max-w-4/5") : ("px-16 lg:px-10 py-10 lg:py-10 min-w-1/2 max-w-4/5 lg:max-w-3/5 max-h-9/10")}
        children={
          <div>
            {!randomEntry ? (
              <div className="flex justify-center">
                <p className="text-slate-700 text-xl">
                  Nothing to reminisce on :-(<br></br>Write something first!
                </p>
              </div>
            ) : (
              <div className="flex">
                <div className="w-1/3">
                  <p
                    className="text-red-500 font-semibold text-sm md:text-md lg:text-lg text-left mb-3"
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {randomEntry.date}
                  </p>
                  {randomEntry.items.map((item, index) => (
                    <p
                      key={index}
                      className="font-mono text-pink-500 md:font-semibold text-xs md:text-sm text-left mb-1"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
                <div className="w-2/3 ml-6">
                  <p
                    className="mb-2 text-slate-700 text-base md:text-lg lg:text-xl font-semibold"
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {randomEntry.prompt}
                  </p>

                  <p
                    className="text-slate-700 text-base md:text-lg lg:text-xl"
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {randomEntry.submittedEntry}
                  </p>
                </div>
              </div>
            )}
          </div>
        }
      />

      <ModalUI
        isOpen={showAbout}
        onClose={handleCloseAbout}
        size="px-16 lg:px-30 py-10 lg:py-18 w-3/5 max-h-9/10"
        children={
          <div>
            <p className="text-slate-700 text-base md:text-lg lg:text-xl">
              Hello! Thank you for installing{" "}
              <span className="font-semibold">You Are Rich</span>.
              <br />
              <br />
              This extension was born out of a part silly / part serious idea
              that we are all so very rich and need to document it and remember
              it more often :-)
              <br />
              <br />
              All your thoughts are stored locally, meaning they are tied and
              private to your device.
              <br />
              <br />
              <span className="font-semibold">Currents</span> is a way to record
              any media you are consuming, things that may be shaping your
              thoughts and feelings. Any of these fields can be left blank.
              <br />
              <br />
              <span className="font-semibold">Reminisce</span> lets you go back
              in time to a random day to see what you were thinking about.
              <br />
              <br />
              Hope you enjoy! Have fun! Let us be rich!
              <br />
              <br />
              Created by{" "}
              <span className="font-semibold text-pink-500 hover:font-bold ease-in-out duration-200">
                <a href="https://vivientran42.github.io" target="_blank">
                  Vivien Tran
                </a>
              </span>
              .
            </p>
          </div>
        }
      />

      <div className="bg-fuchsia-50 px-10 pt-32 pb-30 min-w-full min-h-[50vh]">
        <EntryFormUI
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
