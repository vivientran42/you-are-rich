import React from "react";
import { format } from "date-fns";

interface CardProps {
  mp3?: string;
  artist?: string;
  book?: string;
  author?: string;
  mp4?: string;
  description: string;
}

const formatItems = (
  mp3?: string,
  artist?: string,
  book?: string,
  author?: string,
  mp4?: string,
) => {
  const items = [];
  if (mp3 && artist) {
    items.push({
      text: `🎧\u00A0\u00A0${(mp3 || "").toUpperCase()}_${(artist || "").toUpperCase()}`,
    });
  }
  if (mp3 && !artist) {
    items.push({ text: `🎧\u00A0\u00A0${(mp3 || "").toUpperCase()}` });
  }
  if (!mp3 && artist) {
    items.push({ text: `🎧\u00A0\u00A0${(artist || "").toUpperCase()}` });
  }
  if (book && author) {
    items.push({
      text: `📖\u00A0\u00A0${(book || "").toUpperCase()}_${(author || "").toUpperCase()}`,
    });
  }
  if (book && !author) {
    items.push({ text: `📖\u00A0\u00A0${(book || "").toUpperCase()}` });
  }
  if (!book && author) {
    items.push({ text: `📖\u00A0\u00A0${(author || "").toUpperCase()}` });
  }
  if (mp4) {
    items.push({ text: `🎬\u00A0\u00A0${(mp4 || "").toUpperCase()}` });
  }
  return items;
};

const Card: React.FC<CardProps> = ({
  mp3,
  artist,
  book,
  author,
  mp4,
  description,
}) => {
  const now = new Date();
  const formattedDate = format(now, "EEEE dd MMM yyyy h:mmaaa");
  const items = formatItems(mp3, artist, book, author, mp4);

  return (
    <label className="block col-span-1">
      <input type="checkbox" className="peer hidden absolute scale-0" />
      <span className="block p-5 rounded-xl peer-checked:rounded-b-none bg-white hover:bg-fuchsia-50 transition-all duration-300 delay-150 hover:scale-101 ease-in-out peer-checked:hover:scale-100">
        <p className="text-red-500 text-lg md:text-xl lg:text-2xl text-center mb-3">
          {formattedDate}
        </p>
        {items.map((item, index) => (
          <p
            key={index}
            className="font-mono text-pink-500 md:font-semibold text-xl text-xs text-left px-4 mb-1"
          >
            {item.text}
          </p>
        ))}
      </span>
      <span className="block overflow-hidden rounded-b-xl bg-white max-h-0 peer-checked:max-h-screen transition-all duration-300 peer-checked:delay-200">
        <p
          className="p-5 text-slate-700 text-sm w-full"
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {description}
        </p>
      </span>
    </label>
  );
};

export default Card;
