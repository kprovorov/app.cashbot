import { NoSymbolIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "./SecondaryButton";
import { PropsWithChildren } from "react";
import { ButtonProps } from "./Button";

export default function CancelButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <SecondaryButton {...props}>
      <NoSymbolIcon className="w-6 h-6" />
      {children}
    </SecondaryButton>
  );
}
