import tw from "tailwind-styled-components";

interface InputProps {
  $invalid?: boolean;
}

export default tw.input<InputProps>`${(p) =>
  p.$invalid
    ? "border-error text-error"
    : "border-gray-300 text-gray-900"} border w-full rounded py-2 px-3 leading-tight disabled:opacity-50`;
