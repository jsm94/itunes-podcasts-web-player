import { cn } from "../utils/helpers";

export enum Icons {
  PLAY = "play",
  PAUSE = "pause",
}

interface IconProps {
  icon: Icons;
  className?: string;
}

const icons = {
  [Icons.PLAY]: (
    <g>
      <path d="M13.5931 6.415L4.375 0.529999V15.4931L13.5894 9.5875C13.8576 9.41889 14.0787 9.18507 14.2321 8.90786C14.3855 8.63066 14.4662 8.3191 14.4665 8.00228C14.4669 7.68547 14.387 7.37372 14.2343 7.09615C14.0815 6.81858 13.861 6.58424 13.5931 6.415Z" />
    </g>
  ),
  [Icons.PAUSE]: (
    <g>
      <path d="M5.0625 0.375H1.78125V11.625H5.0625V0.375Z" />
      <path d="M10.2188 0.375H6.9375V11.625H10.2188V0.375Z" />
    </g>
  ),
};

export const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return (
    <svg
      className={cn(className)}
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="white"
    >
      {icons[icon]}
    </svg>
  );
};
