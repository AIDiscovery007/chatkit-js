"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

export function Button({ variant = "solid", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "button-reset",
        variant === "solid" ? "btn-solid" : "btn-outline",
        className,
      )}
      {...props}
    />
  );
}
