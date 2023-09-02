import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@mui/base/Button";
import * as React from "react";

import { cn } from "../../utils/helpers";

export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

type ButtonProps = BaseButtonProps & {
  variant?: ButtonVariants;
};

const variantClasses = {
  [ButtonVariants.PRIMARY]:
    "bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600",
  [ButtonVariants.SECONDARY]: "hover:bg-zinc-700 focus:bg-zinc-700",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant, ...other } = props;
    return (
      <BaseButton
        ref={ref}
        className={cn(
          "p-[7.5px] cursor-pointer disabled:cursor-not-allowed text-sm font-sans focus:outline-0 text-white rounded-full border-none disabled:opacity-50",
          variantClasses[variant ?? ButtonVariants.SECONDARY],
          className
        )}
        {...other}
      />
    );
  }
);

export default Button;
