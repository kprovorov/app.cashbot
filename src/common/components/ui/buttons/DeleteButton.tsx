import { TrashIcon } from "@heroicons/react/24/solid";
import DangerButton from "./DangerButton";
import { PropsWithChildren } from "react";
import { ButtonProps } from "./Button";

export default function DeleteButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <DangerButton {...props}>
      <TrashIcon className="w-6 h-6" />
      {children}
    </DangerButton>
  );
}
