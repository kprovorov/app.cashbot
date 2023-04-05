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
      default: "text-white bg-gray-darkest hover:bg-black disabled:bg-gray",
      link: "text-gray-dark bg-transparent hover:bg-gray-dark/5 hover:border-gray-darkest disabled:text-gray disabled:bg-transparent",
    },
    primary: {
      default:
        "text-white bg-primary hover:bg-primary-dark disabled:bg-primary-light",
      link: "text-primary bg-transparent hover:bg-gray-dark/5 hover:border-primary disabled:text-primary-light disabled:bg-transparent",
    },
    danger: {
      default: "text-white bg-red hover:bg-red-dark disabled:bg-red-light",
      link: "text-red  bg-transparent hover:bg-gray-dark/5 hover:border-red disabled:text-red-light disabled:bg-transparent",
    },
    warning: {
      default:
        "text-white bg-warning hover:bg-warning-dark disabled:bg-warning-light",
      link: "text-orange bg-transparent hover:bg-gray-dark/5 hover:border-orange  disabled:text-orange-light disabled:bg-transparent",
    },
  }[p.$variant || "default"][p.$style || "link"];
}}`;
