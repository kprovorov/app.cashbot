import { PaymentType } from "../../../types/Enums";
import CreatePaymentForm from "../CreatePaymentForm";

export default function CreatePaymentView({
  paymentType = undefined,
  accountId = undefined,
  onCancel = () => {},
  onCreated = () => {},
}: {
  paymentType?: PaymentType;
  accountId?: number;
  onCreated?: () => void;
  onCancel?: () => void;
}) {
  return (
    <CreatePaymentForm
      onCreated={onCreated}
      onCancel={onCancel}
      paymentType={paymentType}
      accountId={accountId}
    />
  );
}
