import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import "./main.css";
import Api from "./Api";
const App = () => {
  //Every time your component renders, React will update the screen and then run the code inside useEffect.
  // In other words, useEffect “delays” a piece of code from running until that render is reflected on the screen.
  // useEffect(() => {});

  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="container">
      <input text={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <Api />
    </div>
  );
};

export default App;
