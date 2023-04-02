import Button from "./Button";

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button {...props} $variant="primary" $style="default">
      {children}
    </Button>
  );
}
