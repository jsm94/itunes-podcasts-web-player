import { useWebPlayerContext } from "../../context/WebPlayerContext";

import { useWebPlayer } from "../../hooks/webPlayer/useWebPlayer";

import WebPlayerControls from "./WebPlayerControls";
import WebPlayerTrackDetail from "./WebPlayerTrackDetail";
import WebPlayerVolumeController from "./WebPlayerVolumeController";

const WebPlayer = () => {
  const {
    tracksPlaying,
    currentTrackIndex,
    currentTimeCalc,
    changeCurrentTime,
  } = useWebPlayer();
  const state = useWebPlayerContext();
  const { podcast } = state;

  const currentTrack = tracksPlaying?.[currentTrackIndex];

  return (
    <div className="flex gap-4 justify-between bg-eerie-black text-white">
      <WebPlayerTrackDetail track={currentTrack} podcast={podcast} />
      <WebPlayerControls
        currentTimeCalc={currentTimeCalc}
        currentTrackIndex={currentTrackIndex}
        tracksPlaying={tracksPlaying}
        changeCurrentTime={changeCurrentTime}
      />
      <WebPlayerVolumeController />
    </div>
  );
};

export default WebPlayer;
