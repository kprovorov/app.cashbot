import { PlusIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "./SecondaryButton";
import DashedButton from "./DashedButton";

export default function CreateButton({ children, ...props }) {
  return (
    <DashedButton {...props}>
      <PlusIcon className="w-6 h-6" />
      {children}
    </DashedButton>
  );
}
