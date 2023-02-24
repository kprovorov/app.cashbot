import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";
import Button from "../../common/components/ui/buttons/Button";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import CreatePaymentForm from "./CreatePaymentForm";

export default function CreatePaymentModal({
  show,
  onClose,
  onCreated,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  onCreated: () => void;
}>) {
  return (
    <Modal show={show} onClose={onClose} title="Add payment">
      <CreatePaymentForm formId="create-payment-form" onCreated={onCreated} />
      <ModalFooter>
        <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        <PrimaryButton form="create-payment-form" type="submit">
          Save changes
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
}
