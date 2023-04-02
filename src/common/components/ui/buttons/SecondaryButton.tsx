import Button from "./Button";

export default function SecondaryButton({ children, ...props }) {
  return (
    <Button {...props} $variant="primary" $style="link">
      {children}
    </Button>
  );
}
