import tw from "tailwind-styled-components";

interface InputProps {
  $invalid?: boolean;
}

export default tw.input<InputProps>`${(p) =>
  p.$invalid
    ? "border-red text-red"
    : "border-gray text-gray-dark"} w-4 h-4 border rounded py-2 px-3 font-sans leading-tight disabled:opacity-50`;
