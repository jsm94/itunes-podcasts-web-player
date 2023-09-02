import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/helpers";
import { Icon, IconSizes, Icons } from "./Icon";
import Button, { ButtonVariants } from "./ui/Button";

const ButtonWebPlayer = forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
    isActive?: boolean;
    icon: Icons;
  } & HTMLAttributes<HTMLButtonElement>
>(({ onClick, isActive, icon, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      variant={ButtonVariants.SECONDARY}
      onClick={onClick}
      className="p-[13px]"
    >
      <Icon
        icon={icon}
        size={IconSizes.LARGE}
        className={cn(isActive && "fill-indigo-500")}
      />
    </Button>
  );
});

export default ButtonWebPlayer;