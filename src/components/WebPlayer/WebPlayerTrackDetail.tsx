import { Episode } from "../../modules/podcasts/domain/Episode";
import { Podcast } from "../../modules/podcasts/domain/Podcast";

const WebPlayerTrackDetail = ({
  track,
  podcast,
}: {
  track: Episode | undefined;
  podcast: Podcast | undefined;
}) => {
  return (
    <div className="flex w-[480px] items-center gap-4">
      <img
        width="110"
        height="110"
        src={track?.image ?? podcast?.image}
        alt={track?.title ?? podcast?.title}
      />
      <div className="flex flex-col">
        <h2 className="text-white text-base font-medium">{track?.title}</h2>
        <span className="text-white text-opacity-30 text-base font-medium">
          {podcast?.author}
        </span>
      </div>
    </div>
  );
};

export default WebPlayerTrackDetail;
