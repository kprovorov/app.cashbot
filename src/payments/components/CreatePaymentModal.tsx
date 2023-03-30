import { PropsWithChildren } from "react";
import Modal from "../../common/components/ui/modal/Modal";
import { PaymentType } from "../../types/Enums";
import CreatePaymentView from "./Views/CreatePaymentView";

export default function CreatePaymentModal({
  paymentType = undefined,
  accountId = undefined,
  show,
  onClose,
}: PropsWithChildren<{
  paymentType?: PaymentType;
  accountId?: number;
  show: boolean;
  onClose: () => void;
}>) {
  return (
    <Modal show={show} onClose={onClose} title="Add payment">
      <CreatePaymentView
        onCreated={onClose}
        onCancel={onClose}
        paymentType={paymentType}
        accountId={accountId}
      />
    </Modal>
  );
}
