import { PlusIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "./SecondaryButton";
import DashedButton from "./DashedButton";
import { PropsWithChildren } from "react";
import { ButtonProps } from "./Button";

export default function CreateButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <DashedButton {...props}>
      <PlusIcon className="w-6 h-6" />
      {children}
    </DashedButton>
  );
}
