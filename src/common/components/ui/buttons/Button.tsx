import tw from "tailwind-styled-components";

interface ButtonProps {
  $size?: "sm" | "md" | "lg";
}

export default tw.button<ButtonProps>`${(p) =>
  p.$size === "sm"
    ? "px-3 py-2"
    : p.$size === "lg"
    ? "px-12 py-8"
    : "px-6 py-4"} rounded transition duration-200 ease-in-out capitalize flex gap-2 items-center justify-center font-semibold`;
