import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { useWebPlayer } from "../hooks/webPlayer/useWebPlayer";
import { Episode } from "../modules/podcasts/domain/Episode";
import { Podcast } from "../modules/podcasts/domain/Podcast";
import { Icon, IconSizes, Icons } from "./Icon";

import { msToDuration, secondsToDuration } from "../utils/formatters";
import ButtonPlay from "./ButtonPlay";
import ButtonWebPlayer from "./ButtonWebPlayer";
import Slider from "./ui/Slider";

const WebPlayer = () => {
  const { tracksPlaying, currentTrackIndex, currentTimeCalc } = useWebPlayer();
  const state = useWebPlayerContext();
  const { volume, podcast, currentTime, isLooping, isShuffling, isPlaying } =
    state;
  const dispatch = useWebPlayerDispatch();

  const currentTrack = tracksPlaying?.[currentTrackIndex];

  const handlePlay = () => {
    if (isPlaying) {
      dispatch({
        type: WebPlayerActionTypes.PAUSE,
      });
      return;
    }
    dispatch({
      type: WebPlayerActionTypes.PLAY,
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
    <div className="flex gap-4 justify-between bg-eerie-black text-white">
      <WebPlayerTrackDetail track={currentTrack} podcast={podcast} />
      <WebPlayerControls
        isPlaying={isPlaying}
        isLooping={isLooping}
        isShuffling={isShuffling}
        currentTime={currentTime}
        currentTrack={currentTrack}
        currentTimeCalc={currentTimeCalc}
        handleShuffle={handleShuffle}
        handlePrev={handlePrev}
        handlePlay={handlePlay}
        handleNext={handleNext}
        handleLoop={handleLoop}
      />
      <WebPlayerVolumeController volume={volume} handleVolume={handleVolume} />
    </div>
  );
};

function WebPlayerTrackDetail({
  track,
  podcast,
}: {
  track: Episode | undefined;
  podcast: Podcast | undefined;
}) {
  return (
    <div className="flex w-[480px] items-center gap-4">
      <img width="110" height="110" src={podcast?.image} alt={podcast?.title} />
      <div className="flex flex-col">
        <h2 className="text-white text-base font-medium">{track?.title}</h2>
        <span className="text-white text-opacity-30 text-base font-medium">
          {podcast?.author}
        </span>
      </div>
    </div>
  );
}

function WebPlayerControls({
  isPlaying,
  isLooping,
  isShuffling,
  currentTime,
  currentTrack,
  currentTimeCalc,
  handleShuffle,
  handlePrev,
  handlePlay,
  handleNext,
  handleLoop,
}: {
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  currentTime: number;
  currentTrack: Episode | undefined;
  currentTimeCalc: number;
  handleShuffle: () => void;
  handlePrev: () => void;
  handlePlay: () => void;
  handleNext: () => void;
  handleLoop: () => void;
}) {
  return (
    <div className="flex items-center gap-[30px]">
      <ButtonWebPlayer
        icon={Icons.SHUFFLE}
        onClick={handleShuffle}
        isActive={isShuffling}
        aria-label={isShuffling ? "shuffle on" : "shuffle off"}
      />
      <ButtonWebPlayer icon={Icons.PREV} onClick={handlePrev} />
      <ButtonPlay
        onClick={handlePlay}
        isPlaying={isPlaying}
        size={IconSizes.LARGE}
      />
      <ButtonWebPlayer icon={Icons.NEXT} onClick={handleNext} />
      <ButtonWebPlayer
        onClick={handleLoop}
        icon={Icons.REPEAT}
        isActive={isLooping}
        aria-label={isLooping ? "loop on" : "loop off"}
      />
      <div className="flex gap-3.5 items-center">
        <span className="text-white text-base font-medium">
          {currentTime ? secondsToDuration(currentTime) : "0:00"}
        </span>
        <div className="w-[419px]">
          <Slider defaultValue={currentTimeCalc} value={currentTimeCalc} />
        </div>
        <span className="text-white text-base font-medium">
          {currentTrack ? msToDuration(currentTrack.duration) : "0:00"}
        </span>
      </div>
    </div>
  );
}

function WebPlayerVolumeController({
  volume,
  handleVolume,
}: {
  volume: number;
  handleVolume: (event: Event, value: number | number[]) => void;
}) {
  return (
    <div className="flex px-[30px] gap-[11px] items-center align-center min-w-fit">
      <Icon icon={Icons.VOLUME} size={IconSizes.LARGE} />
      <div className="w-[100px]">
        <Slider
          defaultValue={volume * 100}
          value={volume * 100}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}

export default WebPlayer;
