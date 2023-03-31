import tw from "tailwind-styled-components";

interface InputProps {
  $invalid?: boolean;
  $size?: "sm" | "md" | "lg";
}

export default tw.input<InputProps>`${(p) =>
  p.$invalid ? "border-red text-red" : "border-transparent text-gray-dark"} ${(
  p
) =>
  p.$size === "sm"
    ? "p-2"
    : p.$size === "lg"
    ? "p-8"
    : "p-4"} bg-gray-light w-full rounded font-sans leading-tight disabled:opacity-50`;
