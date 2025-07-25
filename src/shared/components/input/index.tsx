"use client";

import Icon from "@/shared/components/Icon";
import type { IconProps } from "@/shared/components/Icon";
import { cn } from "@/shared/utils/style";
import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  status?: "default" | "error";
  iconOption?: IconProps;
  ref?: React.Ref<HTMLInputElement>;
  unit?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName,
      status = "default",
      iconOption,
      className,
      disabled,
      type = "text",
      onChange,
      unit,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <div
        className={cn(
          "w-full h-[44px] rounded-lg bg-bg-base-normal flex items-center px-lg gap-x-sm caret-purple-200 ring-inset ring-bg-base-normal transition-all",
          "focus-within:ring-inset focus-within:ring-1 focus-within:ring-border-primary-hover",
          { "bg-bg-disabled": disabled },
          {
            "ring-1 ring-inset ring-border-danger focus-within:ring-border-danger":
              status === "error",
          },
          containerClassName
        )}
      >
        {unit && <span className="text-text-weak">{unit}</span>}
        <input
          className={cn(
            "peer outline-none text-text-strong typo-sub-lg-normal flex-1",
            "placeholder:text-text-weak",
            { "text-text-disabled": disabled },
            className
          )}
          placeholder="Value"
          type={type}
          onChange={handleChange}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {iconOption && (
          <Icon
            icon={iconOption.icon}
            className={cn(ICON_CLASS, iconOption.className)}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const ICON_CLASS = clsx("size-2xl text-text-weak");

export default Input;

export type { InputProps };
