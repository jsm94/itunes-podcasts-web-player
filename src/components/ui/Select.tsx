import {
  Option as BaseOption,
  OptionOwnerState,
  OptionProps,
} from "@mui/base/Option";
import {
  Select as BaseSelect,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import clsx from "clsx";
import { forwardRef } from "react";

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number>>) => {
  let classes = "";
  if (disabled) {
    classes += "text-white";
  } else {
    if (selected) {
      classes += " bg-zinc-700 text-white";
    } else if (highlighted) {
      classes += " bg-zinc-900 text-white";
    }
    classes += "hover:bg-zinc-900 hover:text-white";
  }
  return classes;
};

export const Option = forwardRef<HTMLLIElement, OptionProps<string>>(
  (props, ref) => {
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: `list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
              { selected, highlighted, disabled }
            )}`,
          }),
        }}
      />
    );
  }
);

type ButtonExtendedProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const Button = forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple> & ButtonExtendedProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, startAdornment, endAdornment, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {startAdornment}
      {other.children}
      {endAdornment}
    </button>
  );
});

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

export const Select = forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple> & ButtonExtendedProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <BaseSelect
      ref={ref}
      {...props}
      slots={{
        root: Button,
        ...props.slots,
      }}
      className={clsx("CustomSelect", props.className)}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `flex gap-4 items-center relative text-base font-normal box-border w-80 px-3 py-2 rounded-lg text-left text-white transition-all hover:bg-eerie-black outline-0
              focus:bg-eerie-black`,
              resolvedSlotProps?.className
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm font-normal p-1.5 my-3 w-80 rounded-[15px] overflow-auto outline-0 bg-eerie-black border border-solid border-zinc-800 text-white`,
              resolvedSlotProps?.className
            ),
          };
        },
        popper: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popper,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});
