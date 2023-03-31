import tw from "tailwind-styled-components";

interface InputProps {
  $invalid?: boolean;
}

export default tw.input<InputProps>`${(p) =>
  p.$invalid
    ? "border-red text-red"
    : "border-transparent text-gray-dark"} bg-gray-light w-full rounded p-4 font-sans leading-tight disabled:opacity-50`;
