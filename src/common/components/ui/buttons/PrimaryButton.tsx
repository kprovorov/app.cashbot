import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "./Button";

export default function PrimaryButton({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.ComponentProps<"button">>) {
  return (
    <Button {...props} $variant="primary" $style="default">
      {children}
    </Button>
  );
}
