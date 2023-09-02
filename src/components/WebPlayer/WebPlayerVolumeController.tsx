import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../../context/WebPlayerContext";

import { Icon, IconSizes, Icons } from "../Icon";
import Slider from "../ui/Slider";

const WebPlayerVolumeController = () => {
  const state = useWebPlayerContext();
  const { volume } = state;
  const dispatch = useWebPlayerDispatch();

  const handleVolume = (event: Event, value: number | number[]) => {
    dispatch({
      type: WebPlayerActionTypes.SET_VOLUME,
      payload: {
        ...state,
        volume: Number(value) / 100,
      },
    });
  };

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
};

export default WebPlayerVolumeController;
