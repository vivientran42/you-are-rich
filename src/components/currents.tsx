import { getLatestCurrents } from "@/db/currents";
import { Currents } from "@/db/currents";

interface CurrentsProps {
  mp3?: string;
  artist?: string;
  book?: string;
  author?: string;
  mp4?: string;
  showCurrents: boolean;
  setShowCurrents: React.Dispatch<React.SetStateAction<boolean>>;
  setLatestCurrentsFields: React.Dispatch<
    React.SetStateAction<Partial<Currents>>
  >;
}

const CurrentsUI: React.FC<CurrentsProps> = ({
  mp3,
  artist,
  book,
  author,
  mp4,
  showCurrents,
  setShowCurrents,
  setLatestCurrentsFields,
}) => {
  return (
    showCurrents && (
      <div className="absolute top-13 end-7 rounded-lg border-2 border-red-500 bg-white/95 px-8 py-4 w-70">
        <label className="block font-mono font-semibold text-red-500 text-sm mb-5">
          🎧 SONG/ALBUM<br></br>
          <input
            type="text"
            name="mp3"
            placeholder="CURRENT MUSIC ON REPEAT?"
            autoComplete="off"
            className="w-full border-b border-red-500 text-slate-600 font-sans font-normal text-sm placeholder:font-mono placeholder:text-xs"
            defaultValue={mp3}
          ></input>
        </label>
        <label className="block font-mono font-semibold text-red-500 text-sm mb-5">
          🎧 ARTIST<br></br>
          <input
            type="text"
            name="artist"
            placeholder="WHO CREATED IT?"
            autoComplete="off"
            className="w-full border-b border-red-500 text-slate-600 font-sans font-normal text-sm placeholder:font-mono placeholder:text-xs"
            defaultValue={artist}
          ></input>
        </label>
        <label className="block font-mono font-semibold text-red-500 text-sm mb-5">
          📖 BOOK<br></br>
          <input
            type="text"
            name="book"
            placeholder="CURRENTLY READING?"
            autoComplete="off"
            className="w-full border-b border-red-500 text-slate-600 font-sans font-normal text-sm placeholder:font-mono placeholder:text-xs"
            defaultValue={book}
          ></input>
        </label>
        <label className="block font-mono font-semibold text-red-500 text-sm mb-5">
          📖 AUTHOR<br></br>
          <input
            type="text"
            name="author"
            placeholder="WHO WROTE IT?"
            autoComplete="off"
            className="w-full border-b border-red-500 text-slate-600 font-sans font-normal text-sm placeholder:font-mono placeholder:text-xs"
            defaultValue={author}
          ></input>
        </label>
        <label className="block font-mono font-semibold text-red-500 text-sm mb-5">
          🎬 MOVIE/TV SHOW<br></br>
          <input
            type="text"
            name="mp4"
            placeholder="LAST WATCHED/WATCHING?"
            autoComplete="off"
            className="w-full border-b border-red-500 text-slate-600 font-sans font-normal text-sm placeholder:font-mono placeholder:text-xs"
            defaultValue={mp4}
          ></input>
        </label>
        <div className="flex flex-row justify-between items-center">
          <button
            className="w-20 rounded-full bg-red-500 hover:bg-red-600 hover:shadow-sm font-mono font-semibold text-white text-sm px-4 py-2 hover:scale-105 ease-in-out duration-200"
            onClick={() => {
              const inputs = document.querySelectorAll("input");
              inputs.forEach((input) => (input.value = ""));
            }}
          >
            CLEAR
          </button>
          <button
            className="w-20 rounded-full bg-red-500 hover:bg-red-600 hover:shadow-sm font-mono font-semibold text-white text-sm px-4 py-2 hover:scale-105 ease-in-out duration-200"
            onClick={async () => {
              const getOrUndefined = (name: string) => {
                const val = (
                  document.querySelector(
                    `input[name="${name}"]`,
                  ) as HTMLInputElement
                )?.value;
                return val && val.trim() !== "" ? val : undefined;
              };

              const currents: Currents = {
                mp3: getOrUndefined("mp3"),
                artist: getOrUndefined("artist"),
                book: getOrUndefined("book"),
                author: getOrUndefined("author"),
                mp4: getOrUndefined("mp4"),
              };

              await import("@/db/currents").then(({ addCurrents }) =>
                addCurrents(currents),
              );

              const latest = await getLatestCurrents();
              setLatestCurrentsFields(latest[0] || {});

              const inputs = document.querySelectorAll("input");
              inputs.forEach((input) => (input.value = ""));

              setShowCurrents(false);
            }}
          >
            SAVE
          </button>
        </div>
      </div>
    )
  );
};

export default CurrentsUI;
