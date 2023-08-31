import { useWebPlayer } from "../hooks/webPlayer/useWebPlayer";

const WebPlayer = () => {
  const { tracksPlaying, currentTrackIndex } = useWebPlayer();

  const currentTrack = tracksPlaying?.[currentTrackIndex];

  return <h1>{currentTrack?.title}</h1>;
};

export default WebPlayer;
