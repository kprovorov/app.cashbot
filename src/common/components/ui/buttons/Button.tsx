import tw from "tailwind-styled-components";

interface ButtonProps {
  $size?: "sm" | "md" | "lg";
  $variant?: "default" | "primary" | "danger" | "warning";
  $style?: "default" | "link";
}

export default tw.button<ButtonProps>`
${(p) => {
  return {
    sm: "px-sm py-2",
    md: "px-md py-4",
    lg: "px-lg py-8",
  }[p.$size || "md"];
}}
rounded-lg
transition
duration-200
ease-in-out
capitalize
flex
gap-2
items-center
justify-center
font-semibold
box-border
${(p) => {
  return {
    default: {
      default: "text-white bg-gray hover:bg-gray-dark",
      link: "text-gray bg-transparent hover:text-gray-dark",
    },
    primary: {
      default: "text-white bg-primary hover:bg-primary-dark",
      link: "text-primary bg-transparent hover:text-primary-dark",
    },
    danger: {
      default: "text-white bg-red hover:bg-red-dark",
      link: "text-red bg-transparent hover:text-red-dark",
    },
    warning: {
      default: "text-white bg-warning hover:bg-warning-dark",
      link: "text-orange bg-transparent hover:text-orange-dark",
    },
  }[p.$variant || "default"][p.$style || "link"];
}}`;
