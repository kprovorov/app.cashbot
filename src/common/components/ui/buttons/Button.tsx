import tw from "tailwind-styled-components";

export type ButtonProps = {
  $size?: "xs" | "sm" | "md" | "lg";
  $variant?: "default" | "primary" | "danger" | "warning";
  $style?: "default" | "link";
};

export default tw.button<ButtonProps>`
${(p) => {
  return {
    xs: "p-xs rounded",
    sm: "p-sm rounded",
    md: "p-md rounded-md",
    lg: "p-lg rounded-lg",
  }[p.$size || "md"];
}}
transition
duration-200
ease-in-out
capitalize
flex
gap-sm
items-center
justify-center
font-semibold
box-border
${(p) => {
  return {
    default: {
      default: "text-white bg-gray-dark hover:bg-gray-darkest",
      link: "text-gray-dark bg-transparent hover:bg-gray-dark/5 hover:border-gray-darkest",
    },
    primary: {
      default: "text-white bg-primary hover:bg-primary-dark",
      link: "text-primary bg-transparent hover:bg-gray-dark/5 hover:border-primary",
    },
    danger: {
      default: "text-white bg-red hover:bg-red-dark",
      link: "text-red bg-transparent hover:bg-gray-dark/5 hover:border-red",
    },
    warning: {
      default: "text-white bg-warning hover:bg-warning-dark",
      link: "text-orange bg-transparent hover:bg-gray-dark/5 hover:border-orange",
    },
  }[p.$variant || "default"][p.$style || "link"];
}}`;
