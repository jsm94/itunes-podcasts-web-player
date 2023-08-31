import { useEffect, useRef, useState } from "react";
import { useWebPlayerContext } from "../../context/WebPlayerContext";
import { Episode } from "../../modules/podcasts/domain/Episode";

export const useWebPlayer = () => {
  const {
    tracks,
    currentTime,
    currentTrackIndex,
    isLooping,
    isPlaying,
    isShuffling,
    volume,
  } = useWebPlayerContext();

  const [tracksPlaying, setTracksPlaying] = useState<Episode[]>();

  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!tracks.length) return;
    setTracksPlaying(tracks);
    audioRef.current.src = tracks[0].audio!;
    audioRef.current.load();
    audioRef.current.volume = volume;
    audioRef.current.play();
  }, [tracks]);

  return {
    tracksPlaying,
    currentTrackIndex,
  };
};
