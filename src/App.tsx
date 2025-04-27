import { useState, useEffect } from 'react';

function App() {
  // setting prompt
  const prompts = [
    "What are you grateful for?",
    "What are you excited for?", 
    "What are you curious about?", 
    "What are you feeling?",
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
  const richValues = [
    "life",
    "love", 
    "kindness", 
    "time", 
    "wisdom", 
    "gratitude", 
  ];

  const [richValue, setRichProp] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * richValues.length);
    setRichProp(richValues[randomIndex]);
  }, []);

  // auto-resize text area
  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
  };

  return (
    <main>
      <div className="flex flex-col items-center w-full min-w-full px-10 pt-10"> 

      <textarea id="entry" 
        placeholder={prompt} 
        onInput={autoResize}
        className="w-full border-b-3 border-red-500 text-3xl sm:text-5xl" />
      <button className="bg-red-500 hover:bg-pink-500 text-white w-full py-3 px-20 mt-10 rounded-xl text-3xl sm:text-5xl">I am rich in {richValue}</button>

      </div>
    </main>
  )
}

export default App
