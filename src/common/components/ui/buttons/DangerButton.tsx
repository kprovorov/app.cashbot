import Button from "./Button";

export default function DangerButton({ children, ...props }) {
  return (
    <Button {...props} $variant="danger" $style="link">
      {children}
    </Button>
  );
}
