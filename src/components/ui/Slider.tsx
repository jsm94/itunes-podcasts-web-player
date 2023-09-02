import {
  Slider as SliderBase,
  SliderProps as SliderBaseProps,
} from "@mui/base/Slider";
import * as React from "react";

import { cn } from "../../utils/helpers";

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const CustomSlider = React.forwardRef<HTMLSpanElement, SliderBaseProps>(
  (props, ref) => {
    return (
      <SliderBase
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          root: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.root,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: cn(
                `h-[5px] w-full py-4 inline-block relative touch-none ${
                  ownerState.disabled
                    ? "opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600"
                    : "hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400"
                }`,
                resolvedSlotProps?.className
              ),
            };
          },
          rail: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.rail,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: cn(
                "block absolute w-full h-[5px] rounded-[10px] bg-white opacity-30",
                resolvedSlotProps?.className
              ),
            };
          },
          track: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.track,
              ownerState
            );

            return {
              ...resolvedSlotProps,
              className: cn(
                "block absolute h-[5px] rounded-[10px] bg-white",
                resolvedSlotProps?.className
              ),
            };
          },
          thumb: (ownerState, { active, focused }) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.thumb,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: cn(
                `hidden absolute w-4 h-4 -ml-1.5 -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-white hover:shadow-outline-purple ${
                  focused || active ? "shadow-outline-purple" : ""
                }`,
                resolvedSlotProps?.className
              ),
            };
          },
        }}
      />
    );
  }
);

export default CustomSlider;
