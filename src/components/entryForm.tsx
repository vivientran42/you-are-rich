import { useState } from "react";
import { format } from "date-fns";
import { Entries } from "../db/entries";
import { Currents, getAllCurrents, getLatestCurrents } from "../db/currents";
import { addEntry, getEntries } from "../db/entries";

interface EntryFormProps {
  prompt: string;
  richValue: string;
  setEntries: React.Dispatch<React.SetStateAction<Entries[]>>;
  setCurrents: React.Dispatch<React.SetStateAction<Currents[]>>;
  changePromptAndRichValue: () => void;
}

const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
  e.target.style.height = "1.5em";
  e.target.style.height = `${e.target.scrollHeight}px`;
};

const EntryFormUI: React.FC<EntryFormProps> = ({
  prompt,
  richValue,
  setEntries,
  setCurrents,
  changePromptAndRichValue,
}) => {
  const [entry, setEntry] = useState("");

  const handleSubmit = async () => {
    const now = new Date();
    const formattedDate = format(now, "EEEE dd MMM yyyy h:mmaaa");

    const latestCurrents = await getLatestCurrents();
    const currentId =
      latestCurrents.length > 0 && latestCurrents[0].id
        ? latestCurrents[0].id
        : 0;

    const newEntry: Entries = {
      date: formattedDate,
      prompt: prompt,
      entry: entry,
      currentId: currentId,
    };

    await addEntry(newEntry);
    const updatedEntries = await getEntries();
    setEntries(updatedEntries);
    setEntry("");
    const updatedCurrents = await getAllCurrents();
    setCurrents(updatedCurrents);
    changePromptAndRichValue();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <textarea
        id="entry"
        placeholder={prompt}
        value={entry}
        onInput={autoResize}
        onChange={(e) => {
          autoResize(e);
          setEntry(e.target.value);
        }}
        className="w-full border-b-3 border-red-500 text-3xl sm:text-4xl md:text-5xl text-slate-600"
      />
      <button
        disabled={entry.trim() === ""}
        className={`py-3 px-20 mt-15 rounded-xl text-3xl sm:text-4xl md:text-5xl ease-in-out duration-500
          ${
            entry.trim() === ""
              ? "bg-red-500 text-fuchsia-200 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 hover:shadow-sm hover:scale-102 text-white"
          }
        `}
        onClick={handleSubmit}
      >
        I am rich in {richValue}
      </button>
    </div>
  );
};

export default EntryFormUI;
