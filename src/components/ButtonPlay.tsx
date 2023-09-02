import { Icon, Icons } from "./Icon";
import Button, { ButtonVariants } from "./ui/Button";

const ButtonPlay = ({
  onClick,
  isPlaying,
}: {
  onClick: () => void;
  isPlaying: boolean;
}) => {
  return (
    <Button
      variant={isPlaying ? ButtonVariants.PRIMARY : ButtonVariants.SECONDARY}
      onClick={onClick}
      aria-label={`${isPlaying ? "pause" : "play"} track`}
    >
      {isPlaying ? (
        <Icon icon={Icons.PAUSE} viewBox="-2 -1 15 15" />
      ) : (
        <Icon icon={Icons.PLAY} />
      )}
    </Button>
  );
};

export default ButtonPlay;
