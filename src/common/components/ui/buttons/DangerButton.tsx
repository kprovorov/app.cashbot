import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "./Button";

export default function DangerButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <Button {...props} $variant="danger" $style="link">
      {children}
    </Button>
  );
}
