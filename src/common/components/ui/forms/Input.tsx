import tw from "tailwind-styled-components";

interface InputProps {
  $invalid?: boolean;
  $size?: "sm" | "md" | "lg";
}

export default tw.input<InputProps>`
${(p) =>
  p.$invalid ? "border-red text-red" : "border-transparent text-gray-dark"}
${(p) => {
  return {
    sm: "p-sm rounded",
    md: "p-md rounded-md",
    lg: "p-lg rounded-lg",
  }[p.$size || "md"];
}}
transition
duration-200
ease-in-out
bg-gray-lightest
hover:bg-gray-light
w-full
font-sans
leading-tight
disabled:opacity-50
`;
