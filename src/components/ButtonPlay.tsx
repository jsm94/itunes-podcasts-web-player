import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/helpers";
import { Icon, IconSizes, Icons } from "./Icon";
import Button, { ButtonVariants } from "./ui/Button";

const sizePauseViewBox = {
  [IconSizes.SMALL]: "-2 -1 15 15",
  [IconSizes.MEDIUM]: "-2 -2 16 16",
  [IconSizes.LARGE]: "-2 -2 16 16",
};

const sizePlayViewBox = {
  [IconSizes.SMALL]: undefined,
  [IconSizes.MEDIUM]: "0 0 16 16",
  [IconSizes.LARGE]: "0 0 16 16",
};

const padding = {
  [IconSizes.SMALL]: undefined,
  [IconSizes.MEDIUM]: "p-[13px]",
  [IconSizes.LARGE]: "p-[13px]",
};

const ButtonPlay = forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
    isPlaying: boolean;
    isLoading?: boolean;
    size?: IconSizes;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, isPlaying, isLoading, size, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      variant={isPlaying ? ButtonVariants.PRIMARY : ButtonVariants.SECONDARY}
      onClick={onClick}
      className={cn(padding[size ?? IconSizes.SMALL])}
    >
      {isLoading ? (
        <Icon
          className="fill-none stroke-current stroke-2 animate-spin"
          icon={Icons.LOADING}
          size={IconSizes.SMALL}
          viewBox="0 0 24 24"
        />
      ) : (
        <Icon
          icon={isPlaying ? Icons.PAUSE : Icons.PLAY}
          size={size ?? IconSizes.SMALL}
          viewBox={
            isPlaying
              ? sizePauseViewBox[size ?? IconSizes.SMALL]
              : sizePlayViewBox[size ?? IconSizes.SMALL]
          }
        />
      )}
    </Button>
  );
});

export default ButtonPlay;
