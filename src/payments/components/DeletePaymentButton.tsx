import { PropsWithChildren } from "react";
import { useDeletePaymentMutation } from "../../api/payments";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import { Payment } from "../../types/Models";
import { TrashIcon } from "@heroicons/react/24/solid";
import DangerButton from "../../common/components/ui/buttons/DangerButton";

export default function DeletePaymentButton({
  payment,
  onDeleted = () => {},
  children,
}: PropsWithChildren<{
  payment: Payment;
  onDeleted?: () => void;
}>) {
  const { mutate } = useDeletePaymentMutation(payment.id);

  const submit = () => {
    mutate(
      {
        date: payment.date.format("YYYY-MM-DD"),
      },
      {
        onSuccess: onDeleted,
      }
    );
  };

  return (
    <DangerButton onClick={submit} type="button">
      <TrashIcon className="w-6 h-6" />
      {children}
    </DangerButton>
  );
}
