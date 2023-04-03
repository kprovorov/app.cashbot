import { PropsWithChildren } from "react";
import { useDeletePaymentMutation } from "../../api/payments";
import { Payment } from "../../types/Models";
import DeleteButton from "../../common/components/ui/buttons/DeleteButton";

export default function DeletePaymentButton({
  payment,
  onDeleted = () => {},
  $size = "md",
  children,
}: PropsWithChildren<{
  payment: Payment;
  onDeleted?: () => void;
  $size?: "sm" | "md" | "lg";
}>) {
  const { mutate, isLoading } = useDeletePaymentMutation(payment.id);

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
    <DeleteButton
      onClick={submit}
      type="button"
      $size={$size}
      $loading={isLoading}
    >
      {children}
    </DeleteButton>
  );
}
