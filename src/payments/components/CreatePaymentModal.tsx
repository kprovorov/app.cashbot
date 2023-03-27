import { PropsWithChildren } from "react";
import Modal from "../../common/components/ui/modal/Modal";
import CreatePaymentView from "./Views/CreatePaymentView";

export default function CreatePaymentModal({
  show,
  onClose,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
}>) {
  return (
    <Modal show={show} onClose={onClose} title="Add payment">
      <CreatePaymentView onCreated={onClose} onCancel={onClose} />
    </Modal>
  );
}
