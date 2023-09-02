import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { useWebPlayer } from "../hooks/webPlayer/useWebPlayer";

import Slider from "./ui/Slider";

const WebPlayer = () => {
  const { tracksPlaying, currentTrackIndex, currentTimeCalc } = useWebPlayer();
  const state = useWebPlayerContext();
  const { volume, currentTime } = state;
  const dispatch = useWebPlayerDispatch();

  const currentTrack = tracksPlaying?.[currentTrackIndex];

  const handlePlay = () => {
    dispatch({
      type: WebPlayerActionTypes.PLAY,
    });
  };

  const handlePause = () => {
    dispatch({
      type: WebPlayerActionTypes.PAUSE,
    });
  };

  const handleNext = () => {
    dispatch({
      type: WebPlayerActionTypes.NEXT,
    });
  };

  const handlePrev = () => {
    dispatch({
      type: WebPlayerActionTypes.PREV,
    });
  };

  const handleVolume = (event: Event, value: number | number[]) => {
    dispatch({
      type: WebPlayerActionTypes.SET_VOLUME,
      payload: {
        ...state,
        volume: Number(value) / 100,
      },
    });
  };

  const handleLoop = () => {
    dispatch({
      type: WebPlayerActionTypes.LOOP,
    });
  };

  const handleShuffle = () => {
    dispatch({
      type: WebPlayerActionTypes.SHUFFLE,
    });
  };

  return (
    <div className="flex gap-4 text-white">
      <h2>{currentTrack?.title}</h2>
      <button onClick={handleShuffle}>shuffle</button>
      <button onClick={handlePlay}>play</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handlePrev}>prev</button>
      <button onClick={handleNext}>next</button>
      <button onClick={handleLoop}>loop</button>
      <Slider defaultValue={currentTimeCalc} value={currentTimeCalc} />
      <Slider
        defaultValue={volume * 100}
        value={volume * 100}
        onChange={handleVolume}
      />
    </div>
  );
};

export default WebPlayer;
