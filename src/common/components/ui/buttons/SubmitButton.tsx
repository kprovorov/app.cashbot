import { ArrowRightIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "./PrimaryButton";
import { PropsWithChildren } from "react";
import { ButtonProps } from "./Button";

export default function SubmitButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <PrimaryButton {...props}>
      {children}
      <ArrowRightIcon className="w-6 h-6" />
    </PrimaryButton>
  );
}
