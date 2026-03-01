import { useEffect } from "react";
import { useRef } from "react";

const VideoPlayer = ({ src, isPlaying }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
      console.log("play() function is called");
    } else {
      ref.current.pause();
      console.log("pause() function is called");
    }
  }, [isPlaying]);
  return <video ref={ref} src={src} loop playsInline />;
};

export default VideoPlayer;
