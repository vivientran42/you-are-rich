const FormatItems = (
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

export default FormatItems;
