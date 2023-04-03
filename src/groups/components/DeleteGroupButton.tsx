import { PropsWithChildren } from "react";
import { useDeletePaymentsGroupMutation } from "../../api/payments";
import { TrashIcon } from "@heroicons/react/24/solid";
import DangerButton from "../../common/components/ui/buttons/DangerButton";
import DeleteButton from "../../common/components/ui/buttons/DeleteButton";

export default function DeleteGroupButton({
  group,
  onDeleted,
}: PropsWithChildren<{
  group: string;
  onDeleted: () => void;
}>) {
  const { mutate, isLoading } = useDeletePaymentsGroupMutation();

  const submit = async () => {
    mutate(group, { onSuccess: onDeleted });
  };

  return (
    <DeleteButton onClick={submit} $loading={isLoading}>
      Delete Group
    </DeleteButton>
  );
}
