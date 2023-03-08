import { PropsWithChildren } from "react";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import CreateTransferForm from "./CreateTransferForm";

export default function CreateTransferModal({
  show,
  onClose,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
}>) {
  return (
    <Modal show={show} onClose={onClose} title="Add Transfer">
      <CreateTransferForm formId="create-transfer-form" onCreated={onClose} />
      <ModalFooter>
        <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        <PrimaryButton form="create-transfer-form" type="submit">
          Save Changes
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
}
