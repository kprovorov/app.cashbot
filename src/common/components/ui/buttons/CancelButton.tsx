import { NoSymbolIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "./SecondaryButton";

export default function CancelButton({ children, ...props }) {
  return (
    <SecondaryButton {...props}>
      <NoSymbolIcon className="w-6 h-6" />
      {children}
    </SecondaryButton>
  );
}
