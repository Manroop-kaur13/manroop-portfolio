"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-600 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}