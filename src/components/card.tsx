import FormatItems from "../utils/formatItems";

interface CardProps {
  date: string;
  prompt: string;
  submittedEntry: string;
  mp3?: string | undefined;
  artist?: string | undefined;
  book?: string | undefined;
  author?: string | undefined;
  mp4?: string | undefined;
}

const CardUI: React.FC<CardProps> = ({
  date,
  prompt,
  submittedEntry,
  mp3,
  artist,
  book,
  author,
  mp4,
}) => {
  const items = FormatItems(mp3, artist, book, author, mp4);

  return (
    <label className="block col-span-1">
      <input type="checkbox" className="peer hidden absolute scale-0" />
      <span className="block p-5 rounded-xl peer-checked:rounded-b-none bg-white hover:bg-fuchsia-50 transition-all duration-300 delay-150 hover:scale-101 ease-in-out peer-checked:hover:scale-100">
        <p
          className="text-red-500 text-lg md:text-xl lg:text-2xl text-center mb-3"
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {date}
        </p>
        {items.map((item, index) => (
          <p
            key={index}
            className="font-mono text-pink-500 md:font-semibold text-xs text-left px-4 mb-1"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {item.text}
          </p>
        ))}
      </span>
      <span className="block overflow-hidden rounded-b-xl bg-white max-h-0 peer-checked:max-h-screen transition-all duration-300 peer-checked:delay-200">
        <p
          className="px-5 pt-5 mb-2 text-slate-700 text-sm font-semibold w-full"
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {prompt}
        </p>

        <p
          className="px-5 pb-5 text-slate-700 text-sm w-full"
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {submittedEntry}
        </p>
      </span>
    </label>
  );
};

export default CardUI;
