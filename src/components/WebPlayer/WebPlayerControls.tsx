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
}: {
  tracksPlaying: Episode[] | undefined;
  currentTrackIndex: number;
  currentTimeCalc: number;
}) => {
  const state = useWebPlayerContext();
  const { currentTime, isLooping, isShuffling, isPlaying } = state;
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

  return (
    <div className="flex items-center gap-[50px]">
      <div className="flex gap-[30px]">
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
      </div>
      <div className="flex gap-3.5 items-center">
        <span
          className={cn(
            "text-white text-opacity-30 text-base font-medium",
            currentTime && "text-opacity-100"
          )}
        >
          {currentTime ? secondsToDuration(currentTime) : "0:00"}
        </span>
        <div className="w-[419px]">
          <Slider defaultValue={currentTimeCalc} value={currentTimeCalc} />
        </div>
        <span className="text-white text-opacity-30 text-base font-medium">
          {currentTrack ? msToDuration(currentTrack.duration) : "0:00"}
        </span>
      </div>
    </div>
  );
};

export default WebPlayerControls;
