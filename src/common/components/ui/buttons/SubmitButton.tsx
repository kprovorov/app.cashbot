import { ArrowRightIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "./PrimaryButton";

export default function SubmitButton({ children, ...props }) {
  return (
    <PrimaryButton {...props}>
      {children}
      <ArrowRightIcon className="w-6 h-6" />
    </PrimaryButton>
  );
}
