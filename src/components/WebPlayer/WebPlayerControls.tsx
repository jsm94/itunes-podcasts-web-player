import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../../context/WebPlayerContext";
import { Episode } from "../../modules/podcasts/domain/Episode";

import { msToDuration, secondsToDuration } from "../../utils/formatters";
import { cn } from "../../utils/helpers";

import ButtonPlay from "../ButtonPlay";
import ButtonWebPlayer from "../ButtonWebPlayer";
import { IconSizes, Icons } from "../Icon";
import Slider from "../ui/Slider";

const WebPlayerControls = ({
  tracksPlaying,
  currentTrackIndex,
  currentTimeCalc,
  changeCurrentTime,
}: {
  tracksPlaying: Episode[] | undefined;
  currentTrackIndex: number;
  currentTimeCalc: number;
  changeCurrentTime: (value: number) => void;
}) => {
  const state = useWebPlayerContext();
  const { currentTime, isLooping, isShuffling, isPlaying, currentTrackId } =
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

  const handleSeek = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    changeCurrentTime(value as number);
  };

  return (
    <div className="flex items-center gap-10">
      <div className="flex gap-4">
        <ButtonWebPlayer
          icon={Icons.SHUFFLE}
          onClick={handleShuffle}
          isActive={isShuffling}
          aria-label={isShuffling ? "shuffle on" : "shuffle off"}
          disabled={!currentTrackId}
        />
        <ButtonWebPlayer
          icon={Icons.PREV}
          onClick={handlePrev}
          disabled={!currentTrackId}
        />
        <ButtonPlay
          onClick={handlePlay}
          isPlaying={isPlaying}
          size={IconSizes.MEDIUM}
          disabled={!currentTrackId}
        />
        <ButtonWebPlayer
          icon={Icons.NEXT}
          onClick={handleNext}
          disabled={!currentTrackId}
        />
        <ButtonWebPlayer
          onClick={handleLoop}
          icon={Icons.REPEAT}
          isActive={isLooping}
          aria-label={isLooping ? "loop on" : "loop off"}
          disabled={!currentTrackId}
        />
      </div>
      <div className="flex gap-3.5 items-center">
        <span
          className={cn(
            "text-white text-opacity-30 text-base font-medium",
            currentTime && "text-opacity-100"
          )}
        >
          {currentTime ? secondsToDuration(currentTime) : "-:--"}
        </span>
        <div className="w-[419px]">
          <Slider
            onChangeCommitted={handleSeek}
            defaultValue={currentTimeCalc}
            value={currentTimeCalc}
          />
        </div>
        <span className="text-white text-opacity-30 text-base font-medium">
          {currentTrack ? msToDuration(currentTrack.duration) : "-:--"}
        </span>
      </div>
    </div>
  );
};

export default WebPlayerControls;
