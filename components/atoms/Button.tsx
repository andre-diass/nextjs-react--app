/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

const text = "font-medium rounded-lg";

type Size = "xs" | "sm" | "bs" | "lg" | "xlg";
const sizeMap: Record<Size, string> = {
  xs: "px-3 py-2 text-xs",
  sm: "px-3 py-2 text-sm",
  bs: "px-5 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
  xlg: "px-6 py-3.5 text-base",
};

type Variant =
  | "highlight"
  | "primary"
  | "alternative"
  | "alternative2"
  | "failure";

const varianteMap: Record<Variant, string> = {
  highlight:
    "text-white bg-buttonHighlight hover:bg-primary-800 focus:ring-4 focus:ring-highlight focus:outline-none ",
  primary:
    "text-black bg-buttonPrimary hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none ",
  alternative:
    "text-white focus:outline-none bg-secondary rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-800 focus:z-10 focus:ring-4 focus:ring-neutral-200",
  alternative2:
    "text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300   focus:outline-none ",
  failure:
    "text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:ring-red-500",
};
type Props = {
  size: Size;
  variant: Variant;
  full?: boolean;
  type?: string;
  imgSrc?: string | undefined;
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
  type,
  imgSrc,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      type={type || "button"}
      className={clsx(
        text,
        sizeMap[size],
        varianteMap[variant],
        full ? "w-full" : "w-fit",
        "flex items-center",
        "transition duration-100",
        className
      )}
    >
      {imgSrc ? (
        <img
          className="hidden md:block"
          src={imgSrc}
          alt="Icon"
          width={22}
          height={16}
        />
      ) : (
        ""
      )}

      {children}
    </button>
  );
}
