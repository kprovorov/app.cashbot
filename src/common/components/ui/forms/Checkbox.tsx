import tw from "tailwind-styled-components";

interface InputProps {
  $invalid?: boolean;
}

export default tw.input<InputProps>`${(p) =>
  p.$invalid
    ? "border-error text-error"
    : "border-slate-300 text-slate-900"} w-4 h-4 border rounded py-2 px-3 font-sans leading-tight disabled:opacity-50`;