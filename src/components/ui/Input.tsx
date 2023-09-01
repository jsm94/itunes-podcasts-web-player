import { Input as BaseInput, InputProps as BaseInputProps } from "@mui/base";
import { forwardRef } from "react";
import { cn } from "../../utils/helpers";

type InputProps = BaseInputProps & {
  className?: string;
};

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseInput
        className={cn(
          "h-[50px] text-white pl-5 pr-[5px] bg-zinc-900 rounded-[15px] justify-start items-center gap-4 inline-flex",
          className
        )}
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          input: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.input,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: cn(
                "w-full h-[50px] text-white bg-zinc-900 outline-0",
                resolvedSlotProps?.className
              ),
            };
          },
        }}
      />
    );
  }
);

export default Input;
