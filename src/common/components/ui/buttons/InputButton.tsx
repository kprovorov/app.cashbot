import Button from "./Button";

export default function InputButton({ children, ...props }) {
  return (
    <Button {...props} $variant="default" $style="default">
      {children}
    </Button>
  );
}
