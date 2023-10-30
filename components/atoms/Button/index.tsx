import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import { classNames } from "../../../utils/classNames";

const text = "font-medium rounded-lg";

type Size = "xs" | "sm" | "bs" | "lg" | "xlg";
const sizeMap: Record<Size, string> = {
  xs: "px-3 py-2 text-xs",
  sm: "px-3 py-2 text-sm",
  bs: "px-5 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
  xlg: "px-6 py-3.5 text-base",
};

type Variant = "primary" | "alternative" | "accent";
const varianteMap: Record<Variant, string> = {
  primary:
    "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800",
  alternative:
    "text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-800 focus:z-10 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700",
  accent:
    "text-white bg-accent1-500 hover:bg-accent1-600 focus:ring-4 focus:ring-accent1-300 dark:bg-accent1-600 dark:hover:bg-accent1-500 focus:outline-none dark:focus:ring-accent1-400",
};
type Props = {
  size: Size;
  variant: Variant;
  full?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  size,
  variant,
  children,
  full,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        text,
        sizeMap[size],
        varianteMap[variant],
        full ? "w-full" : "w-fit",
        className
      )}
    >
      {children}
    </button>
  );
}
