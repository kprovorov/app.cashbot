import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "./Button";

export default function SecondaryButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <Button {...props} $variant="default" $style="link">
      {children}
    </Button>
  );
}
