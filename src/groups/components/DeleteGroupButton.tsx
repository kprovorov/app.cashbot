import { PropsWithChildren } from "react";
import { useDeletePaymentsGroupMutation } from "../../api/payments";
import { TrashIcon } from "@heroicons/react/24/solid";
import DangerButton from "../../common/components/ui/buttons/DangerButton";

export default function DeleteGroupButton({
  group,
  onDeleted,
}: PropsWithChildren<{
  group: string;
  onDeleted: () => void;
}>) {
  const { mutate } = useDeletePaymentsGroupMutation();

  const submit = async () => {
    mutate(group, { onSuccess: onDeleted });
  };

  return (
    <DangerButton onClick={submit}>
      <TrashIcon className="w-6 h-6" />
      Delete Group
    </DangerButton>
  );
}
