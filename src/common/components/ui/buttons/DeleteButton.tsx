import { TrashIcon } from "@heroicons/react/24/solid";
import DangerButton from "./DangerButton";

export default function DeleteButton({ children, ...props }) {
  return (
    <DangerButton {...props}>
      <TrashIcon className="w-6 h-6" />
      {children}
    </DangerButton>
  );
}
