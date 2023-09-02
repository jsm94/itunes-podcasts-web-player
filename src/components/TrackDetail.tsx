import { cn } from "../utils/helpers";

type TrackDetailProps = {
  className?: string;
  image: string;
  title: string;
  author: string;
};

const TrackDetail = ({ className, image, title, author }: TrackDetailProps) => {
  return (
    <div className={cn("flex rounded-[15px] gap-5 items-center", className)}>
      <img
        width="45"
        height="45"
        className="rounded-lg max-h-[45px]"
        loading="lazy"
        src={image}
        alt={title}
      />
      <div className="flex flex-col">
        <span className="text-white text-base font-medium">{title}</span>
        <span className="text-white text-opacity-30 text-sm font-medium">
          {author}
        </span>
      </div>
    </div>
  );
};

export default TrackDetail;
