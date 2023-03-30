import { PaymentType } from "../../../types/Enums";
import CreatePaymentForm from "../CreatePaymentForm";

export default function CreatePaymentView({
  paymentType = PaymentType.EXPENSE,
  onCancel = () => {},
  onCreated = () => {},
}: {
  paymentType?: PaymentType;
  onCreated?: () => void;
  onCancel?: () => void;
}) {
  return (
    <CreatePaymentForm
      onCreated={onCreated}
      onCancel={onCancel}
      paymentType={paymentType}
    />
  );
}
